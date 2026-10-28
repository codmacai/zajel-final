'use client';

import { useEffect, useState, type ComponentType, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Download,
  Headset,
  LayoutDashboard,
  Loader2,
  LogOut,
  MessageSquarePlus,
  Phone,
  MapPin,
  Package,
  Plus,
  RefreshCw,
  Search,
  Ticket,
  User,
  XCircle,
} from 'lucide-react';
import { useAuthContext } from '@/components/providers/AuthProvider';
import { useMyShipments } from '@/hooks/useMyShipments';
import { useAccountProfile } from '@/hooks/useAccountProfile';
import { useAccountAddresses } from '@/hooks/useAccountAddresses';
import { useMySupportTickets } from '@/hooks/useMySupportTickets';
import AddressAutocompleteInput from '@/components/shipment/AddressAutocompleteInput';
import { EMPTY_GEO_ADDRESS, type ShipmentSummary } from '@/types/shipment';
import type { NewAddressInput } from '@/types/account';
import { trackResultsHref } from '@/components/tracking/data';
import RaiseTicketForm from '@/components/Support/RaiseTicketForm';

type AccountTab = 'overview' | 'profile' | 'addresses' | 'shipments' | 'tickets' | 'support';
type TabIcon = ComponentType<{ className?: string; strokeWidth?: number }>;

const TABS: { id: AccountTab; label: string; icon: TabIcon }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'profile', label: 'Manage profile', icon: User },
  { id: 'addresses', label: 'Saved addresses', icon: MapPin },
  { id: 'shipments', label: 'My shipments', icon: Package },
  { id: 'tickets', label: 'Ticket history', icon: Ticket },
  { id: 'support', label: 'Raise a ticket', icon: Headset },
];

const isTab = (v: string | null): v is AccountTab => !!v && TABS.some((t) => t.id === v);

const card = 'rounded-[1.25rem] border border-[#E5EBE7] bg-white shadow-[0_8px_30px_rgba(6,68,35,0.04)]';
const inputCls =
  'h-12 w-full rounded-[12px] border border-gray-200 bg-white px-4 text-[14px] text-[#064423] outline-none transition-all ' +
  'placeholder:text-gray-400 focus:border-[#36B936] focus:ring-1 focus:ring-[#36B936] sm:rounded-[14px]';
const primaryBtn =
  'inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#36B936] px-7 text-[14px] font-medium text-white outline-none ' +
  'transition-all duration-300 hover:bg-[#2EA32E] active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-[#064423] focus-visible:ring-offset-2 ' +
  'disabled:cursor-not-allowed disabled:opacity-60';

// The badge shows the payment status (as in Zajel-2's AccountPage).
function statusClass(shipment: ShipmentSummary): string {
  const status = shipment.paymentStatus?.toUpperCase();
  if (status === 'PAID') return 'bg-[#36B936]/15 text-[#064423]';
  if (status === 'PENDING') return 'bg-amber-100 text-amber-800';
  return 'bg-gray-100 text-gray-600';
}

// Receipts only exist for shipments booked (and paid) through this site — those have a real
// DB id. Shipments merged in from the mobile app / EventHub get a synthetic negative id and
// have no receipt behind them.
const canDownloadReceipt = (shipment: ShipmentSummary) => shipment.shipmentId > 0 && shipment.paymentStatus === 'PAID';
const receiptHref = (shipment: ShipmentSummary) => `/account/shipments/${shipment.shipmentId}/receipt`;

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return (
    date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
    ', ' +
    date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  );
}

function FormField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex min-w-0 flex-col">
      <label htmlFor={id} className="mx-1 mb-2 text-[12px] text-[#064423] sm:text-[13px]">
        {label}
      </label>
      <input id={id} type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={inputCls} />
    </div>
  );
}

function EmptyState({ Icon, children }: { Icon: TabIcon; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3.5 rounded-[1.25rem] bg-[#F0F4F2] px-6 py-14 text-center text-[14px] text-[#064423]/60">
      <Icon className="h-10 w-10 text-[#36B936]" strokeWidth={1.5} />
      {children}
    </div>
  );
}

function Loading({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-10 text-[14px] text-[#064423]/60">
      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> {label}
    </div>
  );
}

export default function AccountDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { phone, displayName, isAuthenticated, isPendingRegistration, logout } = useAuthContext();
  const { shipments, loading, error, reload } = useMyShipments();
  const { profile, loading: profileLoading, saving: profileSaving, error: profileError, updateProfile } = useAccountProfile();
  const { addresses, loading: addressesLoading, saving: addressSaving, error: addressesError, addAddress } = useAccountAddresses();
  const { tickets, loading: ticketsLoading, error: ticketsError, refresh: refreshTickets } = useMySupportTickets();

  const requested = searchParams?.get('tab') ?? null;
  const tab: AccountTab = isTab(requested) ? requested : isPendingRegistration ? 'profile' : 'overview';
  const setTab = (next: AccountTab) => router.replace(`${pathname}?tab=${next}`, { scroll: false });

  useEffect(() => {
    if (isAuthenticated) void refreshTickets();
  }, [isAuthenticated, refreshTickets]);

  // Profile edit form — seeded from the loaded profile once it arrives.
  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    emiratesId: '',
    nationality: '',
    gender: '',
    dob: '',
    altPhone: '',
  });
  const [profileSaved, setProfileSaved] = useState(false);
  // Re-seed the form whenever a (re)loaded profile arrives — "adjust state when a prop changes".
  const [seededFrom, setSeededFrom] = useState<typeof profile>(null);
  if (profile && profile !== seededFrom) {
    setSeededFrom(profile);
    setProfileForm({
      firstName: profile.firstName ?? '',
      lastName: profile.lastName ?? '',
      email: profile.email ?? '',
      emiratesId: profile.emiratesId ?? '',
      nationality: profile.nationality ?? '',
      gender: profile.gender ?? '',
      dob: profile.dob ? profile.dob.slice(0, 10) : '',
      altPhone: profile.altPhoneNumber ?? '',
    });
  }

  const setProfileField = (key: keyof typeof profileForm) => (v: string) => setProfileForm((p) => ({ ...p, [key]: v }));

  const handleSaveProfile = async () => {
    setProfileSaved(false);
    const result = await updateProfile(profileForm);
    if (result.success) setProfileSaved(true);
  };

  // New-address form
  const emptyAddress = { name: '', phone: phone ?? '', place: EMPTY_GEO_ADDRESS, building: '', apartment: '', type: 'Home' };
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState(emptyAddress);

  const handleAddAddress = async () => {
    if (!newAddress.place.latitude) return;
    const payload: NewAddressInput = {
      id: 0,
      name: newAddress.name,
      phone: newAddress.phone,
      savedBy: phone ?? newAddress.phone,
      address: newAddress.place.formattedAddress,
      street: newAddress.place.formattedAddress,
      building: newAddress.building,
      apartment: newAddress.apartment,
      city: newAddress.place.city,
      defaultArea: newAddress.place.area,
      latitude: String(newAddress.place.latitude),
      longitude: String(newAddress.place.longitude),
      locationUrl: `https://www.google.com/maps/search/?api=1&query=${newAddress.place.latitude},${newAddress.place.longitude}`,
      type: newAddress.type,
      code: newAddress.name,
      isPrimary: false,
    };
    const success = await addAddress(payload);
    if (success) {
      setShowAddAddress(false);
      setNewAddress(emptyAddress);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const shipmentsSection = (
    <section aria-labelledby="shipments-heading">
      <div className="mb-4 flex items-center justify-between">
        <h2 id="shipments-heading" className="text-xl font-medium tracking-tight text-[#064423]">
          My shipments
        </h2>
        <Link href="/send-shipment" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#36B936] hover:underline">
          <Plus className="h-4 w-4" strokeWidth={2} /> New shipment
        </Link>
      </div>

      {isPendingRegistration ? (
        <EmptyState Icon={Package}>
          <p>Finish setting up your profile to book and see shipments.</p>
        </EmptyState>
      ) : loading ? (
        <Loading label="Loading your shipments…" />
      ) : error ? (
        <div className="py-8 text-center text-[14px] text-red-600">
          {error}{' '}
          <button onClick={reload} className="font-medium text-[#36B936] underline">
            Try again
          </button>
        </div>
      ) : shipments.length === 0 ? (
        <EmptyState Icon={Package}>
          <p>You haven&apos;t booked any shipments yet.</p>
          <Link href="/send-shipment" className={`${primaryBtn} mt-1`}>
            Send your first shipment <ArrowRight className="h-4 w-4" />
          </Link>
        </EmptyState>
      ) : (
        <ul className="flex flex-col gap-3">
          {shipments.map((shipment) => (
            <li key={shipment.shipmentId} className={`${card} flex flex-wrap items-center justify-between gap-4 p-5`}>
              <div className="flex min-w-0 flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-2.5 text-[15px] font-medium text-[#064423]">
                  {shipment.referenceNumber ?? shipment.tempAwb}
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide ${statusClass(shipment)}`}>
                    {shipment.paymentStatus}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 text-[14px] text-[#064423]/80">
                  <MapPin className="h-4 w-4 shrink-0 text-[#36B936]" strokeWidth={2} />
                  {shipment.originCity} → {shipment.destinationCity}
                  <span className="text-[13px] text-[#064423]/45">to {shipment.destinationName}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[12.5px] text-[#064423]/45">
                  <Clock className="h-3.5 w-3.5" strokeWidth={2} />
                  {formatDate(shipment.createdAt)}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <div className="text-[15px] font-medium text-[#064423]">
                  {shipment.amount.toFixed(2)} {shipment.currency}
                </div>
                <div className="flex flex-wrap items-center justify-end gap-3">
                  {shipment.referenceNumber && (
                    <Link href={trackResultsHref(shipment.referenceNumber, 'awb')} className="text-[13px] font-medium text-[#36B936] underline">
                      Track shipment
                    </Link>
                  )}
                  {canDownloadReceipt(shipment) && (
                    <a
                      href={receiptHref(shipment)}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-1 text-[13px] font-medium text-[#064423]/55 hover:text-[#064423]"
                    >
                      <Download className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" /> Receipt
                    </a>
                  )}
                  {!shipment.referenceNumber && !canDownloadReceipt(shipment) && (
                    <span className="text-[12px] capitalize text-[#064423]/45">{shipment.shipmentStatusLabel}</span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );

  const profileSection = (
    <section className="flex max-w-[640px] flex-col gap-6" aria-labelledby="profile-heading">
      <h2 id="profile-heading" className="text-xl font-medium tracking-tight text-[#064423]">
        Manage profile
      </h2>

      {isPendingRegistration ? (
        <div className="flex items-start gap-3 rounded-[1.25rem] border border-amber-200 bg-amber-50 p-5">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" strokeWidth={2} />
          <div>
            <p className="text-[14px] font-medium text-amber-900">Your profile isn&apos;t set up yet</p>
            <p className="mt-1 text-[13px] text-amber-800">
              We verified <strong>{phone}</strong>, but there&apos;s no account registered for this number yet. Complete your
              registration in the Zajel app, or{' '}
              <Link href="/support" className="font-medium underline">
                contact support
              </Link>{' '}
              to finish setting up your account.
            </p>
          </div>
        </div>
      ) : profileLoading ? (
        <Loading label="Loading your profile…" />
      ) : (
        <>
          <div className="max-w-[260px] rounded-[1rem] bg-[#F0F4F2] p-4">
            <p className="mb-1 text-[11px] uppercase tracking-wider text-[#064423]/45">Phone</p>
            <p className="text-[15px] font-medium text-[#064423]">{profile?.phoneNumber ?? phone ?? '—'}</p>
          </div>

          <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
            <FormField id="p-first" label="First name" value={profileForm.firstName} onChange={setProfileField('firstName')} />
            <FormField id="p-last" label="Last name" value={profileForm.lastName} onChange={setProfileField('lastName')} />
            <FormField id="p-email" label="Email" type="email" value={profileForm.email} onChange={setProfileField('email')} />
            <FormField id="p-alt" label="Alternate phone" type="tel" value={profileForm.altPhone} onChange={setProfileField('altPhone')} />
            <FormField id="p-eid" label="Emirates ID" value={profileForm.emiratesId} onChange={setProfileField('emiratesId')} />
            <FormField id="p-nat" label="Nationality" value={profileForm.nationality} onChange={setProfileField('nationality')} />
            <FormField id="p-gender" label="Gender" value={profileForm.gender} onChange={setProfileField('gender')} />
            <FormField id="p-dob" label="Date of birth" type="date" value={profileForm.dob} onChange={setProfileField('dob')} />
          </div>

          {profileError && <p className="text-[13px] text-red-600">{profileError}</p>}
          {profileSaved && !profileError && (
            <p className="flex items-center gap-1.5 text-[13px] font-medium text-[#36B936]">
              <Check className="h-4 w-4" strokeWidth={2.5} /> Profile updated
            </p>
          )}

          <button onClick={handleSaveProfile} disabled={profileSaving} className={`${primaryBtn} self-start`}>
            {profileSaving ? 'Saving…' : 'Save changes'}
          </button>
        </>
      )}
    </section>
  );

  const addressesSection = (
    <section className="flex flex-col gap-6" aria-labelledby="addresses-heading">
      <div className="flex items-center justify-between">
        <h2 id="addresses-heading" className="text-xl font-medium tracking-tight text-[#064423]">
          Saved addresses
        </h2>
        {!isPendingRegistration && (
          <button
            onClick={() => setShowAddAddress((v) => !v)}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#36B936] hover:underline"
          >
            <Plus className="h-4 w-4" strokeWidth={2} /> {showAddAddress ? 'Cancel' : 'Add address'}
          </button>
        )}
      </div>

      {showAddAddress && (
        <div className="flex flex-col gap-5 rounded-[1.25rem] border border-[#E5EBE7] bg-[#F0F4F2]/60 p-5">
          <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
            <FormField id="a-name" label="Label (e.g. Home, Office)" value={newAddress.name} onChange={(v) => setNewAddress((a) => ({ ...a, name: v }))} />
            <FormField id="a-phone" label="Phone" type="tel" value={newAddress.phone} onChange={(v) => setNewAddress((a) => ({ ...a, phone: v }))} />
          </div>
          <AddressAutocompleteInput
            id="a-address"
            label="Address"
            value={newAddress.place}
            onChange={(place) => setNewAddress((a) => ({ ...a, place }))}
            countryRestriction="ae"
          />
          <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-3">
            <FormField id="a-building" label="Building" value={newAddress.building} onChange={(v) => setNewAddress((a) => ({ ...a, building: v }))} />
            <FormField id="a-apt" label="Apartment" value={newAddress.apartment} onChange={(v) => setNewAddress((a) => ({ ...a, apartment: v }))} />
            <div className="flex min-w-0 flex-col">
              <label htmlFor="a-type" className="mx-1 mb-2 text-[12px] text-[#064423] sm:text-[13px]">
                Type
              </label>
              <select
                id="a-type"
                value={newAddress.type}
                onChange={(e) => setNewAddress((a) => ({ ...a, type: e.target.value }))}
                className={`${inputCls} cursor-pointer`}
              >
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          {addressesError && <p className="text-[13px] text-red-600">{addressesError}</p>}
          <button
            onClick={handleAddAddress}
            disabled={addressSaving || !newAddress.place.latitude || !newAddress.name}
            className={`${primaryBtn} self-start`}
          >
            {addressSaving ? 'Saving…' : 'Save address'}
          </button>
        </div>
      )}

      {isPendingRegistration ? (
        <EmptyState Icon={MapPin}>
          <p>Finish setting up your profile to save addresses.</p>
        </EmptyState>
      ) : addressesLoading ? (
        <Loading label="Loading your saved addresses…" />
      ) : addresses.length === 0 ? (
        <EmptyState Icon={MapPin}>
          <p>You haven&apos;t saved any addresses yet.</p>
        </EmptyState>
      ) : (
        <ul className="flex flex-col gap-3">
          {addresses.map((addr) => (
            <li key={addr.id} className={`${card} flex items-start gap-4 p-5`}>
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#36B936]" strokeWidth={2} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-[15px] font-medium text-[#064423]">
                  {addr.name}
                  {addr.type && (
                    <span className="rounded-full bg-[#36B936]/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-[#36B936]">
                      {addr.type}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[13px] text-[#064423]/70">{addr.address}</p>
                {addr.phone && <p className="mt-0.5 text-[12px] text-[#064423]/45">{addr.phone}</p>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );

  const ticketsSection = (
    <section className="flex flex-col gap-6" aria-labelledby="tickets-heading">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 id="tickets-heading" className="text-xl font-medium tracking-tight text-[#064423]">
            Ticket history
          </h2>
          <p className="mt-1 text-[14px] text-[#064423]/60">Every support ticket you&apos;ve raised, and its status.</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <button
            onClick={() => void refreshTickets()}
            disabled={ticketsLoading}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#064423]/55 hover:text-[#064423] disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${ticketsLoading ? 'animate-spin' : ''}`} strokeWidth={2} /> Refresh
          </button>
          <button
            type="button"
            onClick={() => setTab('support')}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#36B936] hover:underline"
          >
            <Plus className="h-4 w-4" strokeWidth={2} /> Raise a ticket
          </button>
        </div>
      </div>

      {isPendingRegistration ? (
        <EmptyState Icon={Ticket}>
          <p>Finish setting up your profile to raise and track tickets.</p>
        </EmptyState>
      ) : ticketsLoading && tickets.length === 0 ? (
        <Loading label="Loading your tickets…" />
      ) : ticketsError && tickets.length === 0 ? (
        <div className="py-8 text-center text-[14px] text-red-600">
          {ticketsError}{' '}
          <button onClick={() => void refreshTickets()} className="font-medium text-[#36B936] underline">
            Try again
          </button>
        </div>
      ) : tickets.length === 0 ? (
        <EmptyState Icon={Ticket}>
          <p>You haven&apos;t raised any support tickets yet.</p>
          <button type="button" onClick={() => setTab('support')} className={`${primaryBtn} mt-1`}>
            Raise a ticket <ArrowRight className="h-4 w-4" />
          </button>
        </EmptyState>
      ) : (
        <ul className="flex flex-col gap-3">
          {tickets.map((ticket) => (
            <li key={ticket.id} className={`${card} flex flex-wrap items-center justify-between gap-4 p-5`}>
              <div className="min-w-0">
                <p className="truncate text-[15px] font-medium text-[#064423]">{ticket.subject}</p>
                <p className="mt-1 flex flex-wrap items-center gap-1.5 text-[13px] text-[#064423]/55">
                  <Clock className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
                  {formatDate(ticket.createdAtUtc)}
                  {' · '}
                  {ticket.ticketType}
                  {ticket.referenceNumber ? ` · AWB ${ticket.referenceNumber}` : ''}
                </p>
              </div>
              <span
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-medium ${
                  ticket.success ? 'bg-[#36B936]/15 text-[#064423]' : 'bg-red-50 text-red-600'
                }`}
              >
                {ticket.success ? <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> : <XCircle className="h-3.5 w-3.5" aria-hidden="true" />}
                {ticket.success ? (ticket.freshdeskTicketId ? `#${ticket.freshdeskTicketId}` : 'Submitted') : 'Failed'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );

  const supportSection = (
    <section className="flex flex-col gap-6" aria-labelledby="support-heading">
      <div>
        <h2 id="support-heading" className="text-xl font-medium tracking-tight text-[#064423]">
          Raise a support ticket
        </h2>
        <p className="mt-1 text-[14px] text-[#064423]/60">
          Tell us what went wrong — include the AWB / tracking number if it&apos;s about a shipment. We&apos;ll reply by
          email or phone.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className={`${card} p-5 sm:p-7`}>
          <RaiseTicketForm returnTo="/account?tab=support" showHistory={false} />
        </div>

        <aside className="flex flex-col gap-4">
          <div className={`${card} p-5`}>
            <h3 className="flex items-center gap-2 text-[14px] font-medium text-[#064423]">
              <Clock className="h-4 w-4 text-[#36B936]" aria-hidden="true" /> Support hours
            </h3>
            <p className="mt-2 text-[13px] text-[#064423]/65">Monday – Saturday, 8:00 AM – 5:00 PM</p>
          </div>
          <div className="rounded-[1.25rem] bg-[#064423] p-5">
            <h3 className="flex items-center gap-2 text-[13px] font-medium text-white/80">
              <Phone className="h-4 w-4 text-[#36B936]" aria-hidden="true" /> Call us
            </h3>
            <a href="tel:+971600531111" className="mt-1.5 inline-block text-[20px] font-semibold tracking-tight text-[#36B936]">
              600 53 1111
            </a>
          </div>
          <Link href="/faq" className="px-1 text-[13px] font-medium text-[#064423] underline decoration-[#36B936] underline-offset-4">
            Browse FAQs
          </Link>
        </aside>
      </div>
    </section>
  );

  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-[#36B936] sm:text-sm">Welcome back</p>
          <h1 className="flex flex-wrap items-center gap-2.5 text-[28px] font-medium tracking-tight text-[#064423] sm:text-4xl">
            {displayName ?? 'Your account'}
            {isPendingRegistration && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-[12px] font-medium text-amber-700">
                <AlertTriangle className="h-3.5 w-3.5" strokeWidth={2.5} /> Profile incomplete
              </span>
            )}
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-full border border-[#E5EBE7] px-5 py-2.5 text-[14px] text-[#064423] transition-colors hover:border-[#064423]/40"
        >
          <LogOut className="h-4 w-4" strokeWidth={2} />
          Log out
        </button>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <nav aria-label="Account sections" className="flex shrink-0 gap-1.5 overflow-x-auto md:w-[220px] md:flex-col md:border-r md:border-[#E5EBE7] md:pr-4">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              aria-current={tab === id ? 'page' : undefined}
              className={`flex items-center gap-2.5 whitespace-nowrap rounded-xl px-4 py-2.5 text-[14px] outline-none transition-all focus-visible:ring-2 focus-visible:ring-[#36B936] ${
                tab === id ? 'bg-[#36B936]/10 font-medium text-[#064423]' : 'text-[#064423]/55 hover:bg-[#F0F4F2]'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
              {label}
            </button>
          ))}
        </nav>

        <div className="min-w-0 flex-1">
          {tab === 'overview' && (
            <div className="flex flex-col gap-8">
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/send-shipment"
                  className="inline-flex items-center gap-2.5 rounded-[1.25rem] bg-[#36B936] px-6 py-4 font-medium text-white transition-all hover:bg-[#2EA32E]"
                >
                  <Plus className="h-5 w-5" strokeWidth={2} />
                  Send a new shipment
                </Link>
                <Link
                  href="/track"
                  className="inline-flex items-center gap-2.5 rounded-[1.25rem] border border-[#E5EBE7] bg-[#F0F4F2] px-6 py-4 font-medium text-[#064423] transition-all hover:border-[#36B936]"
                >
                  <Search className="h-5 w-5" strokeWidth={2} />
                  Track a shipment
                </Link>
                <button
                  type="button"
                  onClick={() => setTab('support')}
                  className="inline-flex items-center gap-2.5 rounded-[1.25rem] border border-[#E5EBE7] bg-white px-6 py-4 font-medium text-[#064423] transition-all hover:border-[#36B936]"
                >
                  <MessageSquarePlus className="h-5 w-5" strokeWidth={2} />
                  Raise a ticket
                </button>
                <button
                  type="button"
                  onClick={() => setTab('tickets')}
                  className="inline-flex items-center gap-2.5 rounded-[1.25rem] border border-[#E5EBE7] bg-white px-6 py-4 font-medium text-[#064423] transition-all hover:border-[#36B936]"
                >
                  <Ticket className="h-5 w-5" strokeWidth={2} />
                  Ticket history
                </button>
              </div>
              {shipmentsSection}
            </div>
          )}
          {tab === 'profile' && profileSection}
          {tab === 'addresses' && addressesSection}
          {tab === 'shipments' && shipmentsSection}
          {tab === 'tickets' && ticketsSection}
          {tab === 'support' && supportSection}
        </div>
      </div>
    </div>
  );
}

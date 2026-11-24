// These mirror Zajel.ZAPP.API's own GetUserProfileV2/UpdateUserProfileV2/
// GetCustomerAddressBookV2/AddCustomerAddressV2 field names directly — the backend
// (AccountService) is a pure passthrough, same philosophy as shipment validation. If the real
// API's shape changes, update these types directly; there's no backend DTO layer in between.

export interface AccountProfile {
  userId?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  emiratesId?: string;
  nationality?: string;
  gender?: string;
  dob?: string;
  altPhoneNumber?: string;
  isActive?: boolean;
}

export interface GetProfileResult {
  user: AccountProfile;
}

/** Sent to POST /api/account/profile — field names match Zajel.ZAPP.API's UserInputDTO (note:
 * `altPhone`, not `altPhoneNumber` — that's the real wire key for the request side). */
export interface UpdateProfileInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  emiratesId?: string;
  nationality?: string;
  gender?: string;
  dob?: string;
  altPhone?: string;
}

export interface UpdateProfileResult {
  message: string;
  changesApplied?: number;
  user?: AccountProfile;
  errors?: unknown;
}

/** One saved address — mirrors Zajel.ZAPP.API's CustomerAddress entity. */
export interface SavedAddress {
  id: number;
  code?: string;
  name?: string;
  address?: string;
  street?: string;
  latitude?: string;
  longitude?: string;
  locationUrl?: string;
  phone?: string;
  defaultArea?: string;
  city?: string;
  type?: string; // "Home" | "Work" | "Other"
  isPrimary?: boolean;
  isDeleted?: boolean;
  nearestLandmark?: string;
  userId?: string;
  savedBy?: string;
  building?: string;
  apartment?: string;
}

/** Sent to POST /api/account/addresses — `savedBy`/`phone`/`userId` are overwritten
 * server-side from the bearer token by Zajel.ZAPP.API regardless of what's sent. */
export type NewAddressInput = Omit<SavedAddress, 'id' | 'isDeleted' | 'userId'> & { id: number };

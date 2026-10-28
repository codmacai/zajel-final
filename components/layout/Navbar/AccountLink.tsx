"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useAuthContext } from "@/components/providers/AuthProvider";

/**
 * The navbar's "Login" button — swaps to the signed-in user's name (linking to /account)
 * once a session exists. An amber dot flags an OTP-verified number with no profile yet.
 */
export default function AccountLink({ onClick, style }: { onClick?: () => void; style?: CSSProperties }) {
  const { ready, isAuthenticated, isPendingRegistration, displayName } = useAuthContext();
  const signedIn = ready && (isAuthenticated || isPendingRegistration);

  if (!signedIn) {
    return (
      <Link href="/login" className="btn-login" onClick={onClick} style={style}>
        Login
      </Link>
    );
  }

  return (
    <Link
      href="/account"
      className="btn-login"
      onClick={onClick}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, ...style }}
    >
      <span style={{ maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {displayName ?? "My account"}
      </span>
      {isPendingRegistration && (
        <span
          title="Finish setting up your profile"
          aria-label="Profile incomplete"
          style={{ width: 8, height: 8, borderRadius: "50%", background: "#E0A426", display: "inline-block", flexShrink: 0 }}
        />
      )}
    </Link>
  );
}

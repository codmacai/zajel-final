import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { SITE } from '@/lib/seo';

// Default preview image for links shared on WhatsApp, LinkedIn, X and others.
export const alt = `${SITE.name} | ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const logo = await readFile(join(process.cwd(), 'public/logo.svg'), 'utf8');
  const logoSrc = `data:image/svg+xml;base64,${Buffer.from(logo).toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#ffffff',
          padding: '72px 80px',
          borderTop: '14px solid #36B936',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={420} height={121} alt="" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 64, fontWeight: 600, color: '#064423', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {SITE.tagline}
          </div>
          <div style={{ marginTop: 24, fontSize: 30, color: '#4B6B58' }}>
            Same-day courier · International shipping · Air, sea & land freight
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 26, color: '#36B936', fontWeight: 600 }}>
          Dubai · Abu Dhabi · 195 countries
        </div>
      </div>
    ),
    size,
  );
}

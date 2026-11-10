// Placeholder screens shown the moment a link is clicked, while the next screen loads.

const Line = ({ w, h = 12 }: { w: string; h?: number }) => <div className="c-skel" style={{ width: w, height: h }} />;

function Head() {
  return (
    <div className="c-head">
      <div style={{ flex: 1, display: 'grid', gap: 12 }}>
        <Line w="min(320px, 70%)" h={30} />
        <Line w="min(520px, 90%)" />
      </div>
    </div>
  );
}

export function ListSkeleton({ rows = 7 }: { rows?: number }) {
  return (
    <div aria-busy="true" aria-label="Loading">
      <Head />
      <div className="c-card c-list">
        {Array.from({ length: rows }, (_, i) => (
          <div className="c-row" key={i} style={{ opacity: 1 - i * 0.1 }}>
            <div className="c-skel" style={{ width: 28, height: 28, borderRadius: 9 }} />
            <div className="t" style={{ display: 'grid', gap: 8 }}>
              <Line w={`${38 + ((i * 17) % 30)}%`} h={14} />
              <Line w={`${55 + ((i * 11) % 30)}%`} h={10} />
            </div>
            <div className="c-skel" style={{ width: 92, height: 24, borderRadius: 999 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function EditorSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading">
      <div style={{ marginBottom: 14 }}><Line w="90px" /></div>
      <Head />
      {[3, 2].map((fields, g) => (
        <section className="c-group" key={g}>
          <div className="c-card c-fields">
            {Array.from({ length: fields }, (_, i) => (
              <div className="c-field" key={i}>
                <div style={{ marginBottom: 10 }}><Line w="140px" /></div>
                <div className="c-pair">
                  <div className="c-skel" style={{ height: 44, borderRadius: 14 }} />
                  <div className="c-skel" style={{ height: 44, borderRadius: 14 }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

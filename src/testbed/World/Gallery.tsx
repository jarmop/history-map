import deathImage from '../../assets/death.svg'
import { Marker } from '../newTypes'

interface GalleryProps {
  markers: Marker[]
  year: number
  activeMarker: Marker | undefined
  selectedMarker: Marker | undefined
  setActiveMarker: (marker: Marker | undefined) => void
  setSelectedMarker: (marker: Marker | undefined) => void
}

export function Gallery({
  markers,
  year,
  activeMarker,
  selectedMarker,
  setActiveMarker,
  setSelectedMarker,
}: GalleryProps) {
  return (
    <div
      style={{
        minWidth: '914px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 150px)',
        height: 'fit-content',
        gap: 2,
        padding: 2,
      }}
    >
      {markers
        .sort(
          (a, b) =>
            ((b.end && b.end < year && b.end) || b.start) -
            ((a.end && a.end < year && a.end) || a.start)
        )
        .slice(0, 100)
        .map((a) => (
          <div
            key={a.id}
            onMouseEnter={() => setActiveMarker(a)}
            onMouseLeave={() => setActiveMarker(undefined)}
            onClick={(e) => {
              if (e.detail === 2) {
                a.image && window.open(a.image)
              } else {
                setSelectedMarker(selectedMarker?.id === a.id ? undefined : a)
              }
            }}
            style={{
              position: 'relative',
              cursor: 'pointer',
              backgroundColor: a.id === selectedMarker?.id ? 'lightgreen' : '',
            }}
          >
            {a.thumbnail || a.image ? (
              <img
                src={a.thumbnail || a.image}
                style={{
                  objectFit: 'contain',
                  width: '150px',
                  maxHeight: '150px',
                }}
              />
            ) : (
              <>{a.name}</>
            )}
            {a.type === 'person' && a.end && a.end < year && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '0',
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  display: 'flex',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                <img
                  src={deathImage}
                  style={{
                    width: '60%',
                    // height: '100%',
                    objectFit: 'contain',
                    opacity: '0.3',
                  }}
                />
              </div>
            )}
            {activeMarker?.id === a.id ? (
              <div
                style={{
                  position: 'absolute',
                  bottom: '0',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  fontSize: '11px',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    fontSize: '11px',
                  }}
                >
                  {a.name}
                </div>
                {a.artist
                  ? `${a.artist}, ${a.start}`
                  : a.end
                  ? `${a.start} - ${a.end}`
                  : a.start}

                <br />
                {a.location}
                <br />
                <div
                  style={{
                    fontSize: '11px',
                  }}
                >
                  {a.description}
                </div>
              </div>
            ) : (
              <div
                style={{
                  position: 'absolute',
                  bottom: '0',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  fontSize: '12px',
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                <div>
                  {a.name}
                  {a.type === 'person' ? (
                    (!a.end || a.end >= year) && ', ' + (year - a.start)
                  ) : (
                    <>
                      {', '}
                      <span style={{ textWrap: 'nowrap' }}>
                        {a.start}
                        {a.end ? '-' + a.end : ''}
                      </span>
                    </>
                  )}
                </div>
                {a.type === 'person' && a.end && a.end < year && (
                  <div>
                    Died in {a.end} at the age of {a.end - a.start}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
    </div>
  )
}

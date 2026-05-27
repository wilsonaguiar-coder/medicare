import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = { title: 'Nova Consulta' }

const S  = '#1a5276'  // stroke dark blue
const F  = '#aed6f1'  // fill light blue
const FL = '#dbeafe'  // fill very light blue

const SPECIALTIES: { key: string; label: string; icon: React.ReactNode; price: number }[] = [
  { key: 'CLINICAL_MEDICINE',    label: 'Clínica Médica',       icon: <StethoscopeIcon />, price: 120 },
  { key: 'PEDIATRICS',           label: 'Pediatria',             icon: <BabyIcon />,        price: 130 },
  { key: 'DERMATOLOGY',          label: 'Dermatologia',          icon: <SkinIcon />,        price: 140 },
  { key: 'GYNECOLOGY',           label: 'Ginecologia',           icon: <UterusIcon />,      price: 140 },
  { key: 'ORTHOPEDICS',          label: 'Ortopedia',             icon: <JointIcon />,       price: 150 },
  { key: 'PSYCHIATRY',           label: 'Psiquiatria',           icon: <BrainHeadIcon />,   price: 160 },
  { key: 'NEUROLOGY',            label: 'Neurologia',            icon: <BrainIcon />,       price: 160 },
  { key: 'CARDIOLOGY',           label: 'Cardiologia',           icon: <HeartECGIcon />,    price: 160 },
  { key: 'ENDOCRINOLOGY',        label: 'Endocrinologia',        icon: <ThyroidIcon />,     price: 150 },
  { key: 'GASTROENTEROLOGY',     label: 'Gastroenterologia',     icon: <StomachIcon />,     price: 150 },
  { key: 'OTORHINOLARYNGOLOGY',  label: 'Otorrinolaringologia',  icon: <EarIcon />,         price: 150 },
]

export default function NovaConsultaPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Nova Consulta</h1>
        <p className="mt-1 text-gray-600">Selecione a especialidade desejada para continuar.</p>
      </div>

      {/* Aviso */}
      <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        <strong>Atenção:</strong> Este serviço não é indicado para emergências médicas. Em caso de
        risco imediato à vida, ligue <strong>192 (SAMU)</strong>.
      </div>

      {/* Progresso */}
      <div className="mb-8 flex items-center gap-2 text-sm">
        {['Especialidade', 'Pré-triagem', 'Documentos', 'Pagamento', 'Consulta'].map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            {i > 0 && <div className="h-px flex-1 bg-gray-200" />}
            <div className={[
              'flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium',
              i === 0 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500',
            ].join(' ')}>
              {i + 1}
            </div>
            <span className={i === 0 ? 'font-medium text-gray-900' : 'text-gray-400'}>{step}</span>
          </div>
        ))}
      </div>

      {/* Especialidades */}
      <div className="grid grid-cols-2 gap-3">
        {SPECIALTIES.map((s) => (
          <button
            key={s.key}
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left hover:border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center">{s.icon}</span>
            <div>
              <p className="text-sm font-medium text-gray-900">{s.label}</p>
              <p className="text-xs text-gray-500">R$ {s.price},00 · 30 min</p>
            </div>
          </button>
        ))}
      </div>

      {/* Não sei a especialidade */}
      <button
        className="mt-4 w-full flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{ borderColor: '#17B890', backgroundColor: '#F0FDF9' }}
      >
        <span className="text-3xl">🤔</span>
        <div className="flex-1">
          <p className="text-sm font-semibold" style={{ color: '#0A2342' }}>Não sei qual especialidade escolher</p>
          <p className="text-xs mt-0.5" style={{ color: '#475569' }}>
            Descreva seus sintomas e nossa IA irá indicar a especialidade mais adequada para você.
          </p>
        </div>
        <span className="text-lg">✨</span>
      </button>
    </div>
  )
}

/* ─── Medical Icon Components ─── */

function StethoscopeIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Chest piece */}
      <circle cx="32" cy="52" r="9" fill={F} stroke={S} strokeWidth="2.5"/>
      <circle cx="32" cy="52" r="4.5" fill="white" stroke={S} strokeWidth="1.5"/>
      {/* Stem */}
      <line x1="32" y1="43" x2="32" y2="30" stroke={S} strokeWidth="3" strokeLinecap="round"/>
      {/* Left arm */}
      <path d="M32 30 C30 26 22 20 16 14" stroke={S} strokeWidth="3" strokeLinecap="round" fill="none"/>
      {/* Right arm */}
      <path d="M32 30 C34 26 42 20 48 14" stroke={S} strokeWidth="3" strokeLinecap="round" fill="none"/>
      {/* Left earpiece */}
      <circle cx="14" cy="11" r="5" fill={F} stroke={S} strokeWidth="2.5"/>
      {/* Right earpiece */}
      <circle cx="50" cy="11" r="5" fill={F} stroke={S} strokeWidth="2.5"/>
    </svg>
  )
}

function BabyIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="32" cy="22" r="14" fill={F} stroke={S} strokeWidth="2.5"/>
      {/* Hair curl */}
      <path d="M32 8 C31 5 33 4 35 6" stroke={S} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Eyes */}
      <circle cx="26" cy="20" r="2.5" fill={S}/>
      <circle cx="38" cy="20" r="2.5" fill={S}/>
      {/* Smile */}
      <path d="M27 27 Q32 32 37 27" stroke={S} strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Swaddle body */}
      <path d="M18 36 C12 40 12 58 32 58 C52 58 52 40 46 36 C40 33 24 33 18 36Z"
        fill={FL} stroke={S} strokeWidth="2.5" strokeLinejoin="round"/>
      {/* Swaddle V-fold */}
      <path d="M18 36 L32 45 L46 36" stroke={S} strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
    </svg>
  )
}

function SkinIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Skin section box */}
      <rect x="8" y="28" width="48" height="28" rx="4" fill={F} stroke={S} strokeWidth="2.5"/>
      {/* Epidermis top layer */}
      <rect x="8" y="28" width="48" height="9" rx="4" fill={FL} stroke={S} strokeWidth="2.5"/>
      {/* Hair shaft */}
      <path d="M32 28 C32 22 30 14 29 10" stroke={S} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Hair root bulb */}
      <ellipse cx="31" cy="37" rx="4" ry="5" fill={FL} stroke={S} strokeWidth="1.5"/>
      {/* Follicle dots */}
      <circle cx="20" cy="44" r="2.5" fill={FL} stroke={S} strokeWidth="1.5"/>
      <circle cx="44" cy="44" r="2.5" fill={FL} stroke={S} strokeWidth="1.5"/>
      {/* Sparkle 1 */}
      <line x1="20" y1="14" x2="20" y2="9"  stroke={S} strokeWidth="2" strokeLinecap="round"/>
      <line x1="17" y1="11" x2="23" y2="11" stroke={S} strokeWidth="2" strokeLinecap="round"/>
      {/* Sparkle 2 */}
      <line x1="44" y1="10" x2="44" y2="5"  stroke={S} strokeWidth="2" strokeLinecap="round"/>
      <line x1="41" y1="7"  x2="47" y2="7"  stroke={S} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function UterusIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Uterus body */}
      <path d="M32 10 C29 10 27 14 25 18 C19 20 13 24 11 32 C9 40 15 50 23 54 C27 56 37 56 41 54 C49 50 55 40 53 32 C51 24 45 20 39 18 C37 14 35 10 32 10Z"
        fill={F} stroke={S} strokeWidth="2.5" strokeLinejoin="round"/>
      {/* Cervix */}
      <path d="M28 54 L27 60 Q32 62 37 60 L36 54" stroke={S} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Left fallopian tube */}
      <path d="M25 20 C18 16 12 16 8 20 C6 22 6 26 8 28" stroke={S} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Left ovary */}
      <ellipse cx="7" cy="33" rx="5" ry="7" fill={F} stroke={S} strokeWidth="2"/>
      {/* Right fallopian tube */}
      <path d="M39 20 C46 16 52 16 56 20 C58 22 58 26 56 28" stroke={S} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Right ovary */}
      <ellipse cx="57" cy="33" rx="5" ry="7" fill={F} stroke={S} strokeWidth="2"/>
    </svg>
  )
}

function JointIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Femur shaft */}
      <rect x="26" y="4" width="10" height="22" rx="5" fill={FL} stroke={S} strokeWidth="2.5"/>
      {/* Femur condyles */}
      <ellipse cx="22" cy="30" rx="9" ry="8" fill={F} stroke={S} strokeWidth="2.5"/>
      <ellipse cx="40" cy="30" rx="9" ry="8" fill={F} stroke={S} strokeWidth="2.5"/>
      {/* Tibia plateau */}
      <path d="M12 38 C12 36 16 34 32 34 C48 34 52 36 52 38 C52 40 48 42 32 42 C16 42 12 40 12 38Z"
        fill={F} stroke={S} strokeWidth="2.5"/>
      {/* Tibia shaft */}
      <rect x="26" y="42" width="10" height="18" rx="5" fill={FL} stroke={S} strokeWidth="2.5"/>
      {/* Motion lines left */}
      <path d="M8 28 L4 26" stroke={S} strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M8 32 L3 32" stroke={S} strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M8 36 L4 38" stroke={S} strokeWidth="2.5" strokeLinecap="round"/>
      {/* Motion lines right */}
      <path d="M56 28 L60 26" stroke={S} strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M56 32 L61 32" stroke={S} strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M56 36 L60 38" stroke={S} strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
}

function BrainHeadIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head profile (facing right) */}
      <path d="M40 8 C32 4 20 8 16 18 C12 28 14 38 18 44 C20 48 20 52 22 56 C24 58 28 60 32 58 C36 58 38 54 36 50 L36 46 C40 44 44 38 46 32 C48 24 46 14 40 8Z"
        fill={FL} stroke={S} strokeWidth="2.5" strokeLinejoin="round"/>
      {/* Eye */}
      <circle cx="21" cy="24" r="3" fill={S}/>
      {/* Ear */}
      <path d="M14 36 C10 36 8 38 8 40 C8 42 10 44 14 44" stroke={S} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Brain inside */}
      <path d="M24 18 C20 20 18 26 22 30 C24 32 28 32 30 30 C32 32 36 32 38 30 C42 26 40 20 36 18 C34 16 28 16 24 18Z"
        fill={F} stroke={S} strokeWidth="1.5" strokeLinejoin="round"/>
      {/* Brain wrinkles */}
      <path d="M24 22 Q28 20 30 24" stroke={S} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M32 20 Q36 18 38 22" stroke={S} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M22 27 Q26 25 28 28" stroke={S} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  )
}

function BrainIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left hemisphere */}
      <path d="M32 8 C22 8 12 14 8 24 C4 34 8 46 16 52 C22 56 32 56 32 56 L32 8Z"
        fill={F} stroke={S} strokeWidth="2.5" strokeLinejoin="round"/>
      {/* Right hemisphere */}
      <path d="M32 8 C42 8 52 14 56 24 C60 34 56 46 48 52 C42 56 32 56 32 56 L32 8Z"
        fill={F} stroke={S} strokeWidth="2.5" strokeLinejoin="round"/>
      {/* Central fissure */}
      <line x1="32" y1="8" x2="32" y2="56" stroke={S} strokeWidth="2.5" strokeLinecap="round"/>
      {/* Left gyri */}
      <path d="M12 22 Q18 18 22 24" stroke={S} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M8  32 Q14 28 18 34" stroke={S} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M10 42 Q16 38 20 44" stroke={S} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M18 50 Q24 46 26 50" stroke={S} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {/* Right gyri */}
      <path d="M52 22 Q46 18 42 24" stroke={S} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M56 32 Q50 28 46 34" stroke={S} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M54 42 Q48 38 44 44" stroke={S} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M46 50 Q40 46 38 50" stroke={S} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  )
}

function HeartECGIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Heart */}
      <path d="M32 56 C32 56 6 40 6 22 C6 12 14 6 22 8 C26 10 30 14 32 18 C34 14 38 10 42 8 C50 6 58 12 58 22 C58 40 32 56 32 56Z"
        fill={F} stroke={S} strokeWidth="2.5" strokeLinejoin="round"/>
      {/* ECG line */}
      <path d="M10 34 L19 34 L23 24 L27 44 L31 30 L35 30 L39 34 L54 34"
        stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  )
}

function ThyroidIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left lobe */}
      <ellipse cx="20" cy="26" rx="13" ry="17" fill={F} stroke={S} strokeWidth="2.5"/>
      {/* Right lobe */}
      <ellipse cx="44" cy="26" rx="13" ry="17" fill={F} stroke={S} strokeWidth="2.5"/>
      {/* Isthmus */}
      <rect x="22" y="32" width="20" height="8" rx="3" fill={F} stroke={S} strokeWidth="2"/>
      {/* Trachea */}
      <rect x="26" y="42" width="12" height="14" rx="5" fill={FL} stroke={S} strokeWidth="2.5"/>
      <line x1="26" y1="47" x2="38" y2="47" stroke={S} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="26" y1="51" x2="38" y2="51" stroke={S} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Follicle dots left */}
      <circle cx="15" cy="20" r="2" fill={S} fillOpacity="0.4"/>
      <circle cx="21" cy="28" r="2" fill={S} fillOpacity="0.4"/>
      <circle cx="14" cy="32" r="2" fill={S} fillOpacity="0.4"/>
      {/* Follicle dots right */}
      <circle cx="49" cy="20" r="2" fill={S} fillOpacity="0.4"/>
      <circle cx="43" cy="28" r="2" fill={S} fillOpacity="0.4"/>
      <circle cx="50" cy="32" r="2" fill={S} fillOpacity="0.4"/>
    </svg>
  )
}

function StomachIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Esophagus entry */}
      <path d="M24 6 L24 14" stroke={S} strokeWidth="3.5" strokeLinecap="round"/>
      {/* Stomach body — J-shape with fundus dome upper-left */}
      <path d="M24 14 C18 14 10 18 8 26 C6 34 8 44 14 50 C20 56 30 58 38 56 C46 54 52 46 52 38 C52 30 48 22 42 18 C36 14 30 14 24 14Z"
        fill={F} stroke={S} strokeWidth="2.5" strokeLinejoin="round"/>
      {/* Pylorus exit tube */}
      <path d="M50 40 C54 40 58 38 58 36" stroke={S} strokeWidth="3" strokeLinecap="round" fill="none"/>
      {/* Angular notch (lesser curvature) */}
      <path d="M44 24 C46 28 46 34 44 38" stroke={S} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {/* Rugae folds */}
      <path d="M18 34 Q26 30 30 34" stroke={S} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M16 42 Q24 38 28 42" stroke={S} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  )
}

function EarIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer ear (helix) */}
      <path d="M42 8 C30 6 16 14 14 26 C12 38 18 52 26 56 C30 58 34 58 36 56 C38 54 38 50 34 48 C30 46 28 42 28 38 C28 32 32 28 36 28 C42 28 46 34 46 40 C46 44 48 44 50 40 C52 34 50 20 46 14 C44 10 42 8 42 8Z"
        fill={F} stroke={S} strokeWidth="2.5" strokeLinejoin="round"/>
      {/* Inner concha */}
      <path d="M34 18 C26 20 22 28 24 36 C26 40 30 42 32 40 C30 36 30 30 34 28 C38 26 42 30 42 36 C42 40 44 40 46 36 C48 28 44 18 34 18Z"
        fill={FL} stroke={S} strokeWidth="1.5" strokeLinejoin="round"/>
      {/* Tragus */}
      <path d="M26 50 C22 48 20 44 22 40" stroke={S} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    </svg>
  )
}

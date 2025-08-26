import React, { useState } from "react";
import "./styles.css";

/**
 * CareTrack STARs – bilingual quick-check + education
 * - Toggle English/Español
 * - Check items; brief education appears below
 */

const TEXT = {
  en: {
    appTitle: "CareTrack STARs",
    lang: "Language",
    screenings: "Screenings / Prevention",
    chronic: "Chronic Condition Management",
    safety: "Safety & Function",
    meds: "Medication Adherence",
    educationProvided: "Education",
    summary: "Summary",
  },
  es: {
    appTitle: "CareTrack STARs",
    lang: "Idioma",
    screenings: "Detecciones / Prevención",
    chronic: "Manejo de Condiciones Crónicas",
    safety: "Seguridad y Función",
    meds: "Adherencia a Medicamentos",
    educationProvided: "Educación",
    summary: "Resumen",
  },
};

// Catalog of measures with bilingual labels + brief education
const MEASURES = {
  screenings: [
    {
      id: "breast",
      label: {
        en: "Breast Cancer Screening (mammogram)",
        es: "Detección de Cáncer de Mama (mamografía)",
      },
      edu: {
        en: "Mammograms find breast cancer early when it’s easier to treat. Typically every 1–2 years depending on risk and age.",
        es: "Las mamografías detectan el cáncer de mama temprano cuando es más fácil tratarlo. Generalmente cada 1–2 años según riesgo y edad.",
      },
    },
    {
      id: "colorectal",
      label: {
        en: "Colorectal Cancer Screening",
        es: "Detección de Cáncer de Colon",
      },
      edu: {
        en: "Screening (stool tests or colonoscopy) can find precancerous polyps and prevent cancer.",
        es: "Las pruebas (de heces o colonoscopia) detectan pólipos precancerosos y pueden prevenir el cáncer.",
      },
    },
    {
      id: "flu",
      label: { en: "Annual Flu Shot", es: "Vacuna anual contra la gripe" },
      edu: {
        en: "Yearly flu vaccine lowers risk of severe illness and hospitalization.",
        es: "La vacuna anual reduce el riesgo de enfermedad grave y hospitalización.",
      },
    },
    {
      id: "osteoporosisFx",
      label: {
        en: "Osteoporosis Management after Fracture",
        es: "Manejo de osteoporosis después de fractura",
      },
      edu: {
        en: "Patients with fragility fractures need bone health evaluation and treatment to prevent future fractures.",
        es: "Tras una fractura por fragilidad, se requiere evaluación y tratamiento óseo para prevenir futuras fracturas.",
      },
    },
    {
      id: "eyeDiabetes",
      label: {
        en: "Diabetes: Retinal Eye Exam",
        es: "Diabetes: Examen de ojos (retina)",
      },
      edu: {
        en: "Yearly eye exams catch diabetic retinopathy early and protect vision.",
        es: "Los exámenes anuales detectan la retinopatía diabética temprano y protegen la visión.",
      },
    },
    {
      id: "khe",
      label: {
        en: "Kidney Health Evaluation (Diabetes) – KHE",
        es: "Evaluación de Salud Renal (Diabetes) – KHE",
      },
      edu: {
        en: "For diabetes: check urine albumin and eGFR yearly to find kidney disease early.",
        es: "En diabetes: revisar albúmina en orina y eGFR anualmente para detectar enfermedad renal temprana.",
      },
    },
  ],
  chronic: [
    {
      id: "bp",
      input: "text",
      placeholder: { en: "e.g., 128/78", es: "ej.: 128/78" },
      label: { en: "Blood Pressure (mmHg)", es: "Presión arterial (mmHg)" },
      edu: {
        en: "Goal usually <130/80 for many patients. Control reduces stroke, heart and kidney complications.",
        es: "La meta suele ser <130/80 en muchos pacientes. Controlarla reduce derrame cerebral y complicaciones cardíacas y renales.",
      },
    },
    {
      id: "a1c",
      input: "text",
      placeholder: { en: "e.g., 7.2", es: "ej.: 7.2" },
      label: { en: "A1C (%)", es: "A1C (%)" },
      edu: {
        en: "A1C reflects 3-month average glucose. Typical goal ~7% (individualize by age/comorbids).",
        es: "El A1C refleja el promedio de glucosa de 3 meses. Meta típica ~7% (individualizar según edad/comorbilidades).",
      },
    },
    {
      id: "statin",
      label: { en: "Statin Use (ASCVD/Diabetes)", es: "Uso de estatina (ASCVD/Diabetes)" },
      edu: {
        en: "Statins lower LDL and reduce heart attack and stroke risk for eligible patients.",
        es: "Las estatinas bajan el LDL y reducen el riesgo de infarto y derrame en pacientes elegibles.",
      },
    },
  ],
  safety: [
    {
      id: "falls",
      label: { en: "Falls Screening", es: "Detección de caídas" },
      edu: {
        en: "Ask about falls, balance and home hazards. Simple exercises and home changes reduce injury.",
        es: "Pregunte sobre caídas, equilibrio y riesgos en el hogar. Ejercicios y cambios simples disminuyen lesiones.",
      },
    },
    {
      id: "function",
      label: { en: "Functional Status (ADLs/IADLs)", es: "Estado funcional (AVDs/IAVDs)" },
      edu: {
        en: "Check ability with daily tasks (bathing, shopping, meds). Early support keeps people independent.",
        es: "Revise la capacidad para tareas diarias (baño, compras, medicación). El apoyo temprano mantiene la independencia.",
      },
    },
    {
      id: "advanceCare",
      label: { en: "Advance Care Planning", es: "Planificación de Cuidados Avanzados" },
      edu: {
        en: "Discuss preferences and designate a health proxy before emergencies.",
        es: "Hable sobre preferencias y nombre un apoderado de salud antes de emergencias.",
      },
    },
  ],
  meds: [
    {
      id: "medAdh",
      label: { en: "Medication Adherence (90-day / on-time fills)", es: "Adherencia a medicamentos (90 días / surtidos a tiempo)" },
      edu: {
        en: "On-time refills and 90-day supplies improve disease control and reduce hospitalizations.",
        es: "Los surtidos puntuales y presentaciones de 90 días mejoran el control y reducen hospitalizaciones.",
      },
    },
    {
      id: "medReview",
      label: { en: "Medication Review / Polypharmacy", es: "Revisión de medicamentos / Polifarmacia" },
      edu: {
        en: "Regular reviews catch duplications, side effects and interactions; deprescribe when possible.",
        es: "Las revisiones regulares detectan duplicaciones, efectos adversos e interacciones; deprescribir cuando sea posible.",
      },
    },
  ],
};

export default function App() {
  const [lang, setLang] = useState("en");
  const [checks, setChecks] = useState({});
  const [inputs, setInputs] = useState({ bp: "", a1c: "" });

  const t = TEXT[lang];

  const toggleCheck = (id) =>
    setChecks((c) => ({ ...c, [id]: !c[id] }));

  const handleInput = (id, val) =>
    setInputs((v) => ({ ...v, [id]: val }));

  const renderMeasure = (m) => {
    const label = m.label?.[lang];
    if (m.input === "text") {
      return (
        <label className="row" key={m.id}>
          <div className="lbl">{label}</div>
          <input
            type="text"
            value={inputs[m.id] || ""}
            onChange={(e) => handleInput(m.id, e.target.value)}
            placeholder={m.placeholder?.[lang] || ""}
          />
          <Edu id={m.id} text={m.edu?.[lang]} show={(inputs[m.id] || "").length > 0} />
        </label>
      );
    }
    return (
      <label className="row" key={m.id}>
        <input
          type="checkbox"
          checked={!!checks[m.id]}
          onChange={() => toggleCheck(m.id)}
        />
        <span className="lbl">{label}</span>
        <Edu id={m.id} text={m.edu?.[lang]} show={!!checks[m.id]} />
      </label>
    );
  };

  return (
    <div className="app">
      <header className="header">
        <h1>{t.appTitle}</h1>
        <div className="lang">
          <span>{t.lang}:</span>
          <button
            className={lang === "en" ? "on" : ""}
            onClick={() => setLang("en")}
          >
            EN
          </button>
          <button
            className={lang === "es" ? "on" : ""}
            onClick={() => setLang("es")}
          >
            ES
          </button>
        </div>
      </header>

      <Section title={t.screenings}>
        {MEASURES.screenings.map(renderMeasure)}
      </Section>

      <Section title={t.chronic}>
        {MEASURES.chronic.map(renderMeasure)}
      </Section>

      <Section title={t.safety}>
        {MEASURES.safety.map(renderMeasure)}
      </Section>

      <Section title={t.meds}>
        {MEASURES.meds.map(renderMeasure)}
      </Section>

      <footer className="summary">
        <h3>{t.educationProvided}</h3>
        <p className="muted">
          Tip: check items or enter values to reveal brief, bilingual education
          under each line.
        </p>
      </footer>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="card">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function Edu({ id, text, show }) {
  if (!show) return null;
  return (
    <div className="edu" data-id={id}>
      {text}
    </div>
  );
}

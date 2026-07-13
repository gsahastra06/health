const SYMPTOMS = [
  // General
  { id: "fever", label: "Fever", category: "General" },
  { id: "high_fever", label: "High fever (>39°C)", category: "General" },
  { id: "chills", label: "Chills / shivering", category: "General" },
  { id: "fatigue", label: "Fatigue / weakness", category: "General" },
  { id: "weight_loss", label: "Unexplained weight loss", category: "General" },
  { id: "night_sweats", label: "Night sweats", category: "General" },
  // Respiratory
  { id: "cough_dry", label: "Dry cough", category: "Respiratory" },
  { id: "cough_wet", label: "Cough with sputum", category: "Respiratory" },
  { id: "cough_blood", label: "Coughing blood", category: "Respiratory" },
  { id: "shortness_breath", label: "Shortness of breath", category: "Respiratory" },
  { id: "chest_pain", label: "Chest pain", category: "Respiratory" },
  { id: "sore_throat", label: "Sore throat", category: "Respiratory" },
  { id: "runny_nose", label: "Runny / blocked nose", category: "Respiratory" },
  // GI
  { id: "diarrhea", label: "Diarrhea", category: "Digestive" },
  { id: "bloody_stool", label: "Blood in stool", category: "Digestive" },
  { id: "vomiting", label: "Vomiting", category: "Digestive" },
  { id: "nausea", label: "Nausea", category: "Digestive" },
  { id: "abdominal_pain", label: "Abdominal pain", category: "Digestive" },
  { id: "loss_appetite", label: "Loss of appetite", category: "Digestive" },
  { id: "dehydration", label: "Signs of dehydration", category: "Digestive" },
  // Neuro / pain
  { id: "headache", label: "Headache", category: "Pain" },
  { id: "severe_headache", label: "Severe headache", category: "Pain" },
  { id: "body_ache", label: "Body / muscle ache", category: "Pain" },
  { id: "joint_pain", label: "Joint pain", category: "Pain" },
  { id: "neck_stiffness", label: "Neck stiffness", category: "Pain" },
  { id: "dizziness", label: "Dizziness", category: "Pain" },
  // Skin
  { id: "rash", label: "Skin rash", category: "Skin" },
  { id: "yellow_skin", label: "Yellow skin / eyes", category: "Skin" },
  { id: "pale_skin", label: "Pale skin", category: "Skin" },
  // Cardio / metabolic
  { id: "high_bp", label: "High blood pressure reading", category: "Cardio" },
  { id: "frequent_urination", label: "Frequent urination", category: "Metabolic" },
  { id: "excessive_thirst", label: "Excessive thirst", category: "Metabolic" },
  { id: "blurred_vision", label: "Blurred vision", category: "Metabolic" },
  // Maternal
  { id: "vaginal_bleeding", label: "Vaginal bleeding (pregnancy)", category: "Maternal" },
  { id: "swelling_feet", label: "Swelling in feet / face", category: "Maternal" },
  { id: "reduced_fetal_movement", label: "Reduced fetal movement", category: "Maternal" },
  // Mental
  { id: "anxiety", label: "Anxiety / restlessness", category: "Mental" },
  { id: "low_mood", label: "Low mood / sadness", category: "Mental" },
  { id: "insomnia", label: "Trouble sleeping", category: "Mental" },
  // New Additions
  { id: "eye_redness", label: "Red / bloodshot eyes", category: "General" },
  { id: "ear_pain", label: "Ear pain", category: "Pain" },
  { id: "itching", label: "Severe itching", category: "Skin" },
  { id: "right_lower_abdominal_pain", label: "Severe pain in right lower abdomen", category: "Digestive" },
  { id: "heartburn", label: "Heartburn / acidic burps", category: "Digestive" }
];
const DISEASES = [
  {
    id: "common_cold",
    name: "Common Cold",
    description: "Mild viral upper respiratory infection.",
    symptoms: { runny_nose: 3, sore_throat: 2, cough_dry: 2, fever: 1, headache: 1, fatigue: 1 },
    urgency: "self_care",
    guidance: "Rest, fluids, paracetamol for fever. Resolves in 5–7 days."
  },
  {
    id: "influenza",
    name: "Influenza (Flu)",
    description: "Acute viral infection with systemic symptoms.",
    symptoms: { high_fever: 3, body_ache: 3, fatigue: 3, cough_dry: 2, headache: 2, sore_throat: 1, chills: 2 },
    urgency: "see_doctor",
    guidance: "Rest, fluids, antipyretics. See doctor if breathlessness or symptoms >5 days."
  },
  {
    id: "malaria",
    name: "Malaria",
    description: "Mosquito-borne parasitic infection — common in endemic regions.",
    symptoms: { high_fever: 3, chills: 3, headache: 2, body_ache: 2, vomiting: 1, fatigue: 2, night_sweats: 2 },
    urgency: "urgent_referral",
    guidance: "Refer for rapid diagnostic test (RDT) immediately. Severe malaria is life-threatening."
  },
  {
    id: "dengue",
    name: "Dengue Fever",
    description: "Mosquito-borne viral fever, risk of haemorrhagic complication.",
    symptoms: { high_fever: 3, severe_headache: 2, body_ache: 3, joint_pain: 3, rash: 2, nausea: 1, fatigue: 2 },
    urgency: "urgent_referral",
    guidance: "Refer for NS1/IgM test. Watch for warning signs: bleeding, severe abdominal pain, persistent vomiting."
  },
  {
    id: "typhoid",
    name: "Typhoid Fever",
    description: "Bacterial infection from contaminated food/water.",
    symptoms: { fever: 3, abdominal_pain: 2, headache: 2, loss_appetite: 2, fatigue: 2, diarrhea: 1 },
    urgency: "see_doctor",
    guidance: "Refer for Widal/blood culture. Needs antibiotic course; complete full duration."
  },
  {
    id: "tuberculosis",
    name: "Tuberculosis (TB)",
    description: "Bacterial infection of the lungs (and other organs).",
    symptoms: { cough_wet: 3, cough_blood: 3, weight_loss: 3, night_sweats: 3, fatigue: 2, fever: 2, loss_appetite: 2 },
    urgency: "urgent_referral",
    guidance: "Refer to DOTS centre for sputum test. Highly treatable but contagious — isolate until evaluated."
  },
  {
    id: "pneumonia",
    name: "Pneumonia",
    description: "Lung infection — bacterial or viral.",
    symptoms: { cough_wet: 3, high_fever: 3, shortness_breath: 3, chest_pain: 2, chills: 2, fatigue: 2 },
    urgency: "urgent_referral",
    guidance: "Refer urgently — especially in children and elderly. May need IV antibiotics."
  },
  {
    id: "covid",
    name: "COVID-19 / Viral Respiratory Illness",
    description: "Respiratory viral infection.",
    symptoms: { fever: 2, cough_dry: 3, fatigue: 2, sore_throat: 2, body_ache: 2, shortness_breath: 3, headache: 1 },
    urgency: "see_doctor",
    guidance: "Isolate, monitor oxygen saturation. Refer if SpO2 <94% or breathlessness worsens."
  },
  {
    id: "bronchitis",
    name: "Acute Bronchitis",
    description: "Inflammation of the airways.",
    symptoms: { cough_wet: 3, chest_pain: 2, fatigue: 2, sore_throat: 1, fever: 1 },
    urgency: "see_doctor",
    guidance: "Hydration, rest. Doctor may prescribe bronchodilators if wheezing."
  },
  {
    id: "asthma",
    name: "Asthma Exacerbation",
    description: "Airway constriction with wheeze and breathlessness.",
    symptoms: { shortness_breath: 3, cough_dry: 2, chest_pain: 2 },
    urgency: "urgent_referral",
    guidance: "Use rescue inhaler immediately. Refer if no relief in 15 min."
  },
  {
    id: "gastroenteritis",
    name: "Gastroenteritis",
    description: "Infection of stomach/intestine — usually self-limiting.",
    symptoms: { diarrhea: 3, vomiting: 3, abdominal_pain: 2, nausea: 2, fever: 1, dehydration: 2 },
    urgency: "see_doctor",
    guidance: "ORS, zinc supplements (children). Refer if severe dehydration or blood in stool."
  },
  {
    id: "dysentery",
    name: "Dysentery",
    description: "Bloody diarrhea — bacterial or amoebic.",
    symptoms: { diarrhea: 3, bloody_stool: 3, abdominal_pain: 3, fever: 2, dehydration: 2 },
    urgency: "urgent_referral",
    guidance: "Refer for stool test. Needs antibiotics and hydration."
  },
  {
    id: "cholera",
    name: "Cholera",
    description: "Severe watery diarrhea — outbreak risk.",
    symptoms: { diarrhea: 3, vomiting: 3, dehydration: 3, abdominal_pain: 1 },
    urgency: "urgent_referral",
    guidance: "EMERGENCY. Aggressive ORS/IV fluids. Notify health authorities."
  },
  {
    id: "jaundice_hepatitis",
    name: "Hepatitis / Jaundice",
    description: "Liver inflammation, often viral.",
    symptoms: { yellow_skin: 3, fatigue: 3, loss_appetite: 2, nausea: 2, abdominal_pain: 2, fever: 1 },
    urgency: "urgent_referral",
    guidance: "Refer for LFT and hepatitis screening. Avoid alcohol and hepatotoxic drugs."
  },
  {
    id: "anemia",
    name: "Anemia",
    description: "Low haemoglobin — common in women & children.",
    symptoms: { fatigue: 3, pale_skin: 3, dizziness: 2, shortness_breath: 1 },
    urgency: "see_doctor",
    guidance: "Iron + folic acid supplementation. Refer for Hb test."
  },
  {
    id: "hypertension",
    name: "Hypertension",
    description: "Persistently high blood pressure.",
    symptoms: { high_bp: 3, headache: 2, dizziness: 2, blurred_vision: 1, chest_pain: 1 },
    urgency: "see_doctor",
    guidance: "Lifestyle counselling, refer for antihypertensive evaluation."
  },
  {
    id: "diabetes",
    name: "Diabetes Mellitus",
    description: "Chronic high blood sugar.",
    symptoms: { excessive_thirst: 3, frequent_urination: 3, fatigue: 2, weight_loss: 2, blurred_vision: 2 },
    urgency: "see_doctor",
    guidance: "Refer for FBS/HbA1c. Counsel on diet and physical activity."
  },
  {
    id: "migraine",
    name: "Migraine",
    description: "Recurrent severe headache.",
    symptoms: { severe_headache: 3, nausea: 2, vomiting: 1, blurred_vision: 1, dizziness: 1 },
    urgency: "see_doctor",
    guidance: "Rest in dark room. Doctor may prescribe abortive medication."
  },
  {
    id: "meningitis",
    name: "Meningitis",
    description: "Infection of brain coverings — life-threatening.",
    symptoms: { high_fever: 3, severe_headache: 3, neck_stiffness: 3, vomiting: 2, rash: 2 },
    urgency: "urgent_referral",
    guidance: "EMERGENCY. Refer to hospital immediately."
  },
  {
    id: "uti",
    name: "Urinary Tract Infection",
    description: "Bacterial infection of urinary system.",
    symptoms: { frequent_urination: 3, abdominal_pain: 2, fever: 2 },
    urgency: "see_doctor",
    guidance: "Refer for urine test. Antibiotic course usually needed."
  },
  {
    id: "preeclampsia",
    name: "Pre-eclampsia (pregnancy)",
    description: "Pregnancy-related high BP — dangerous.",
    symptoms: { high_bp: 3, swelling_feet: 3, severe_headache: 2, blurred_vision: 2, abdominal_pain: 1 },
    urgency: "urgent_referral",
    guidance: "EMERGENCY. Refer to obstetric care immediately."
  },
  {
    id: "obstetric_emergency",
    name: "Obstetric Emergency",
    description: "Bleeding or reduced fetal movement in pregnancy.",
    symptoms: { vaginal_bleeding: 3, reduced_fetal_movement: 3, abdominal_pain: 2, dizziness: 2 },
    urgency: "urgent_referral",
    guidance: "EMERGENCY. Arrange transport to nearest CHC/hospital."
  },
  {
    id: "scabies",
    name: "Scabies / Skin Infection",
    description: "Parasitic skin infestation.",
    symptoms: { rash: 3, insomnia: 1 },
    urgency: "see_doctor",
    guidance: "Permethrin cream; treat household contacts."
  },
  {
    id: "anxiety_disorder",
    name: "Anxiety / Stress",
    description: "Psychological distress.",
    symptoms: { anxiety: 3, insomnia: 2, fatigue: 2, headache: 1 },
    urgency: "see_doctor",
    guidance: "Counselling, breathing exercises. Refer to mental health worker if persistent."
  },
  {
    id: "depression",
    name: "Depression",
    description: "Persistent low mood affecting daily life.",
    symptoms: { low_mood: 3, fatigue: 3, insomnia: 2, loss_appetite: 2 },
    urgency: "see_doctor",
    guidance: "Compassionate listening, refer to PHC mental health programme."
  },
  {
    id: "food_poisoning",
    name: "Food Poisoning",
    description: "Acute reaction to contaminated food.",
    symptoms: { vomiting: 3, diarrhea: 3, abdominal_pain: 2, nausea: 2, fever: 1 },
    urgency: "see_doctor",
    guidance: "Hydration with ORS. Refer if severe or symptoms >24h."
  },
  {
    id: "pharyngitis",
    name: "Pharyngitis (Throat Infection)",
    description: "Bacterial or viral throat infection.",
    symptoms: { sore_throat: 3, fever: 2, headache: 1, body_ache: 1 },
    urgency: "see_doctor",
    guidance: "Salt water gargle, lozenges. Antibiotics if streptococcal."
  },
  {
    id: "heat_stroke",
    name: "Heat Stroke / Exhaustion",
    description: "Body overheating from heat exposure.",
    symptoms: { high_fever: 2, dizziness: 3, headache: 2, nausea: 2, fatigue: 3 },
    urgency: "urgent_referral",
    guidance: "Move to shade, cool with water, ORS. Refer if confusion or no improvement."
  },
  {
    id: "appendicitis",
    name: "Appendicitis",
    description: "Inflammation of the appendix. Surgical emergency.",
    symptoms: { right_lower_abdominal_pain: 3, fever: 1, nausea: 2, vomiting: 2, loss_appetite: 2 },
    urgency: "urgent_referral",
    guidance: "EMERGENCY. Do not give food/drink. Refer to hospital immediately for surgical evaluation."
  },
  {
    id: "conjunctivitis",
    name: "Conjunctivitis (Pink Eye)",
    description: "Inflammation or infection of the outer membrane of the eyeball.",
    symptoms: { eye_redness: 3, itching: 2 },
    urgency: "self_care",
    guidance: "Highly contagious. Warm compresses, wash hands frequently. Refer if vision is affected or severe pain."
  },
  {
    id: "chickenpox",
    name: "Chickenpox",
    description: "Highly contagious viral infection causing an itchy, blister-like rash.",
    symptoms: { rash: 3, itching: 3, fever: 2, fatigue: 2, loss_appetite: 1 },
    urgency: "see_doctor",
    guidance: "Isolate. Calamine lotion for itching. Refer if rash gets infected or severe respiratory symptoms develop."
  },
  {
    id: "otitis_media",
    name: "Otitis Media (Ear Infection)",
    description: "Infection of the middle ear, common in children.",
    symptoms: { ear_pain: 3, fever: 2, headache: 1 },
    urgency: "see_doctor",
    guidance: "Paracetamol for pain. Refer for antibiotic evaluation."
  },
  {
    id: "gerd",
    name: "GERD / Acid Reflux",
    description: "Digestive disease in which stomach acid irritates the food pipe.",
    symptoms: { heartburn: 3, nausea: 2, chest_pain: 1, cough_dry: 1 },
    urgency: "self_care",
    guidance: "Avoid spicy/fatty foods. Antacids. Refer if persistent or accompanied by severe chest pain."
  }
];
const URGENCY_RANK = { self_care: 0, see_doctor: 1, urgent_referral: 2 };
const SYMPTOM_IDF = (() => {
  const counts = {};
  for (const d of DISEASES) {
    for (const sid of Object.keys(d.symptoms)) counts[sid] = (counts[sid] ?? 0) + 1;
  }
  const N = DISEASES.length;
  const out = {};
  for (const sid of Object.keys(counts)) {
    out[sid] = 1 + Math.log(N / counts[sid]);
  }
  return out;
})();
function diagnose(selectedSymptoms, deniedSymptoms = []) {
  if (selectedSymptoms.length === 0) return { results: [], topUrgency: "self_care" };
  const yes = new Set(selectedSymptoms);
  const no = new Set(deniedSymptoms);
  const raws = [];
  for (const d of DISEASES) {
    let totalEvidence = 0;
    for (const [sym, w] of Object.entries(d.symptoms)) {
      totalEvidence += w * (SYMPTOM_IDF[sym] ?? 1);
    }
    let matchedEvidence = 0;
    let deniedPenalty = 0;
    let cardinalHits = 0;
    let cardinalDenied = 0;
    const matched = [];
    for (const [sym, w] of Object.entries(d.symptoms)) {
      const idf = SYMPTOM_IDF[sym] ?? 1;
      if (yes.has(sym)) {
        matchedEvidence += w * idf;
        matched.push(sym);
        if (w >= 3) cardinalHits += 1;
      } else if (no.has(sym)) {
        deniedPenalty += w * idf;
        if (w >= 3) cardinalDenied += 1;
      }
    }
    if (matched.length === 0) continue;
    const coverage = matched.length / Object.keys(d.symptoms).length;
    const evidenceRatio = matchedEvidence / totalEvidence;
    const penaltyRatio = deniedPenalty / totalEvidence;
    const cardinalBonus = Math.min(cardinalHits, 2) * 0.12;
    const cardinalDenialPenalty = cardinalDenied * 0.25;
    const raw = evidenceRatio * 0.55 + coverage * 0.25 + cardinalBonus - penaltyRatio * 0.5 - cardinalDenialPenalty;
    if (raw <= 0) continue;
    raws.push({
      diseaseId: d.id,
      name: d.name,
      description: d.description,
      urgency: d.urgency,
      guidance: d.guidance,
      matched,
      raw
    });
  }
  if (raws.length === 0) return { results: [], topUrgency: "self_care" };
  raws.sort((a, b) => b.raw - a.raw);
  const topRaw = raws[0].raw;
  const secondRaw = raws[1]?.raw ?? 0;
  const dominance = topRaw > 0 ? (topRaw - secondRaw) / topRaw : 0;
  const nConfirmed = selectedSymptoms.length;
  const scored = raws.map((r, i) => {
    const d = DISEASES.find((x) => x.id === r.diseaseId);
    let totalEv = 0;
    let matchedEv = 0;
    for (const [sym, w] of Object.entries(d.symptoms)) {
      const idf = SYMPTOM_IDF[sym] ?? 1;
      totalEv += w * idf;
      if (r.matched.includes(sym)) matchedEv += w * idf;
    }
    const evidenceRatio = totalEv > 0 ? matchedEv / totalEv : 0;
    const coverage = r.matched.length / Object.keys(d.symptoms).length;
    let base = (evidenceRatio * 0.65 + coverage * 0.35) * 100;
    if (nConfirmed === 1) {
      base *= 0.75;
    } else if (nConfirmed > 2) {
      base *= 1.1;
    }
    if (i === 0) {
      base += dominance * 15;
    }
    const conf = Math.round(Math.max(0, Math.min(base, 98)));
    return {
      diseaseId: r.diseaseId,
      name: r.name,
      description: r.description,
      urgency: r.urgency,
      guidance: r.guidance,
      matchedSymptoms: r.matched,
      confidence: conf
    };
  });
  const top = scored.slice(0, 5).filter((r) => r.confidence >= 12);
  let topUrgency = "self_care";
  for (const r of top) {
    if (URGENCY_RANK[r.urgency] > URGENCY_RANK[topUrgency]) topUrgency = r.urgency;
  }
  return { results: top, topUrgency };
}
const URGENCY_META = {
  self_care: {
    label: "Self-care",
    tone: "success",
    description: "Symptoms suggest a mild condition. Home care should be sufficient. Reassess in 48h."
  },
  see_doctor: {
    label: "See a doctor",
    tone: "warning",
    description: "Schedule a teleconsultation or visit to PHC within 24 hours."
  },
  urgent_referral: {
    label: "Urgent referral",
    tone: "destructive",
    description: "Refer to CHC / hospital immediately. Arrange transport."
  }
};
function symptomLabel(id) {
  return SYMPTOMS.find((s) => s.id === id)?.label ?? id;
}
export {
  DISEASES as D,
  SYMPTOMS as S,
  URGENCY_META as U,
  diagnose as d,
  symptomLabel as s
};

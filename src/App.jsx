import React, { useState } from 'react';

/**
 * CareTrack STARs — condition-focused tracker with bilingual education blurbs.
 * - Shows brief "what it is" + "why it matters" (EN/ES) under each measure.
 * - Simple flags for overdue/out-of-range.
 */

export default function App() {
  // ---- Goals (editable at bottom) ----
  const [a1cGoal, setA1cGoal] = useState(7.0);
  const [bpGoalSys, setBpGoalSys] = useState(130);
  const [bpGoalDia, setBpGoalDia] = useState(80);

  // ---- Screenings / Prevention ----
  const [breastDate, setBreastDate] = useState('');
  const [crcType, setCrcType] = useState('FIT'); // FIT, FITDNA, Colonoscopy, CTColono, FlexSig
  const [crcDate, setCrcDate] = useState('');
  const [fluDate, setFluDate] = useState('');
  const [fractureDate, setFractureDate] = useState('');
  const [bmdDate, setBmdDate] = useState('');
  const [osteoMedDate

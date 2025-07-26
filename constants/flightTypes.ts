export const flightTypes = [
    { label: "Dual Instruction", value: "DUAL_INSTRUCTION" },       // Emphasizes instruction received
    { label: "Solo Flight", value: "SOLO" },                         // Clear for solo entries
    { label: "Solo Cross-Country", value: "SOLO_CROSS_COUNTRY" },   // Specific solo cross-country
    { label: "Dual Cross-Country", value: "DUAL_CROSS_COUNTRY" },   // Specific dual cross-country
    { label: "Instrument (Actual)", value: "INSTRUMENT_ACTUAL" },  // Actual IMC flight
    { label: "Instrument (Simulated)", value: "INSTRUMENT_SIMULATED" }, // Hood or FTD/Simulator if applicable
    { label: "Night Flight", value: "NIGHT_FLIGHT" },               // Any flight conducted at night
    { label: "Night Instruction", value: "NIGHT_INSTRUCTION" },     // Specific night dual instruction
    { label: "Checkride / Skill Test", value: "CHECKRIDE" },        // For official tests
    { label: "Proficiency Check", value: "PROFICIENCY_CHECK" },     // For ongoing pilot proficiency requirements
    { label: "Abnormal/Emergency Procedures", value: "EMERGENCY_PROCEDURES" }, // Focused training on emergencies
    { label: "Simulator (FSTD)", value: "SIMULATOR_FSTD" },         // General simulator time (if not broken down further)
    { label: "Conversion Training", value: "CONVERSION_TRAINING" }, // Converting licenses/ratings
    { label: "Maintenance Test Flight", value: "MAINTENANCE_TEST_FLIGHT" }, // Flight to test maintenance work
    { label: "Other", value: "OTHER" },                             // Catch-all for less common types
  ];
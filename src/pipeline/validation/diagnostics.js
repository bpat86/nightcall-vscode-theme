function reportDiagnostics({ errors, warnings }) {
  for (const warning of warnings) {
    console.warn(`Warning: ${warning}`);
  }
  for (const error of errors) {
    console.error(`Error: ${error}`);
  }
}

module.exports = { reportDiagnostics };

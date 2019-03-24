/*
<Toggle
  settingsKey="On"
  label="Better Sleep?"
/>
<Slider
  settingsKey="REM"
  label="Cycles (1 cycle is about 90 mins, 4 is how many you get in about 8 hours)"
  min="0"
  max="8"
/>
*/
    
function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Fitbit Account</Text>}>
        <Slider
          settingsKey="REM"
          label="Cycles 0-8 (1 cycle is about 90 mins, 4 is how many you get in about 8 hours)"
          min="0"
          max="8"
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
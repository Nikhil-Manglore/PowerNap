function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Fitbit Account</Text>}>
        <Oauth
          settingsKey="oauth"
          title="Login"
          label="Fitbit"
          status="Login"
          authorizeUrl="https://www.fitbit.com/oauth2/authorize"
          requestTokenUrl="https://api.fitbit.com/oauth2/token"
          clientId="22DLLL"
          clientSecret="18fe69fad795f03e96d75142b5735f58"
          scope="sleep"
        />
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
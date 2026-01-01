// Google Analytics configuration
// TODO: Update 'G-XXXXXXXXXX' with your Google Analytics Measurement ID
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX', {
  anonymize_ip: true,
  cookie_flags: 'SameSite=None;Secure',
});

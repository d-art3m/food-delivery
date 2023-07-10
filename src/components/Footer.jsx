export default function Footer() {
  const footerText = `© ${new Date().getFullYear()} Food Delivery`;
  return (
    <footer>
      <div className="bg-gray-800 text-center leading-8">{footerText}</div>
    </footer>
  );
}

export function ThemeScript() {
  const code = `
    (function() {
      try {
        var saved = localStorage.getItem('theme');
        var theme = saved || 'dark';
        document.documentElement.setAttribute('data-theme', theme);
      } catch (e) {}
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

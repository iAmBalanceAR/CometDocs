import { buildNavigation } from '../utils/docs-navigation';
//import { DocsNavigation } from '../components/DocsNavigation';

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = await buildNavigation();

  return (
    <>
      {/* <DocsNavigation items={navItems} /> */}
      {children}
    </>
  );
} 
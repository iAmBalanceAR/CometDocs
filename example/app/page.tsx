import Link from 'next/link';

export default function Home() {
  return (
    <div className="cometdocs-container">
      <header className="cometdocs-header">
        <div className="cometdocs-header-content">
          <div className="cometdocs-logo-container">
            <div className="cometdocs-logo"></div>
            <h1 className="cometdocs-title">CometDocs</h1>
          </div>
          <div className="cometdocs-header-right">
            <Link href="/docs/guides/getting-started" className="cometdocs-home-cta">
              Documentation
            </Link>
          </div>
        </div>
      </header>
      
      <div className="cometdocs-home">
        <div className="cometdocs-home-hero">
          <div className="cometdocs-home-logo"></div>
          <h1 className="cometdocs-home-title">CometDocs</h1>
          <p className="cometdocs-home-subtitle">
            A lightweight, zero-config documentation system for Next.js applications.
            Documentation that doesn't make you extinct.
          </p>
          <Link href="/docs/guides/getting-started" className="cometdocs-home-cta">
            Get Started
          </Link>
        </div>
        
        <div className="cometdocs-features">
          <div className="cometdocs-feature-card">
            <div className="cometdocs-feature-icon">🚀</div>
            <h3 className="cometdocs-feature-title">Zero Configuration</h3>
            <p className="cometdocs-feature-description">
              Works out of the box with sensible defaults. Just add markdown files to your /docs folder and they appear.
            </p>
          </div>
          
          <div className="cometdocs-feature-card">
            <div className="cometdocs-feature-icon">🔄</div>
            <h3 className="cometdocs-feature-title">Seamless Integration</h3>
            <p className="cometdocs-feature-description">
              Lives within your existing Next.js app, sharing the same styling system and infrastructure.
            </p>
          </div>
          
          <div className="cometdocs-feature-card">
            <div className="cometdocs-feature-icon">💸</div>
            <h3 className="cometdocs-feature-title">No Infrastructure Overhead</h3>
            <p className="cometdocs-feature-description">
              No separate database, auth system, or deployment pipeline. Uses your existing setup.
            </p>
          </div>
          
          <div className="cometdocs-feature-card">
            <div className="cometdocs-feature-icon">📁</div>
            <h3 className="cometdocs-feature-title">File-Based</h3>
            <p className="cometdocs-feature-description">
              Just drop markdown files in a /docs folder and they appear. Simple and intuitive.
            </p>
          </div>
          
          <div className="cometdocs-feature-card">
            <div className="cometdocs-feature-icon">🎨</div>
            <h3 className="cometdocs-feature-title">Theme Inheritance</h3>
            <p className="cometdocs-feature-description">
              Automatically uses your existing Next.js theme/styles for a consistent look and feel.
            </p>
          </div>
          
          <div className="cometdocs-feature-card">
            <div className="cometdocs-feature-icon">🛠️</div>
            <h3 className="cometdocs-feature-title">Simple Customization</h3>
            <p className="cometdocs-feature-description">
              Easy overrides without fighting the system. Customize only what you need.
            </p>
          </div>
        </div>
      </div>
      
      <div className="cometdocs-footer">
        <div className="cometdocs-footer-content">
          <p>Powered by CometDocs - Documentation that doesn't make you extinct.</p>
        </div>
      </div>
    </div>
  );
} 
import type {ReactNode} from 'react';
import {useState, useEffect} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading 
          as="h1" 
          className={clsx('hero__title', styles.heroTitle, isLoaded && styles.fadeIn)}
        >
          {siteConfig.title}
        </Heading>
        <p className={clsx('hero__subtitle', styles.heroSubtitle, isLoaded && styles.fadeInDelay1)}>
          {siteConfig.tagline}
        </p>
        <div className={clsx(styles.buttons, isLoaded && styles.fadeInDelay2)}>
          <Link
            className={clsx('button button--secondary button--lg', styles.primaryButton)}
            to="/docs/getting-started">
            Get Started
          </Link>
          <Link
            className={clsx('button button--outline button--secondary button--lg', styles.secondaryButton)}
            to="/docs/docs">
            View Documentation
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

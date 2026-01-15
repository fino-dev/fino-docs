import type {ReactNode} from 'react';
import {useState, useEffect, useRef} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Beautiful Visualizations',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Transform complex financial data into stunning, interactive charts and graphs.
        Make data-driven decisions with clarity and confidence.
      </>
    ),
  },
  {
    title: 'Powerful Analysis',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Advanced analytical tools designed for financial professionals.
        From basic metrics to sophisticated algorithms, we&apos;ve got you covered.
      </>
    ),
  },
  {
    title: 'Easy Integration',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Seamlessly integrate Fino into your existing workflow.
        Simple APIs and comprehensive documentation make getting started a breeze.
      </>
    ),
  },
];

function Feature({title, Svg, description, index}: FeatureItem & {index: number}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className={clsx('col col--4', styles.featureCard)}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={clsx(styles.featureCardInner, isVisible && styles.fadeInUp)}>
        <div className={clsx('text--center', styles.featureIconWrapper)}>
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div className="text--center padding-horiz--md">
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

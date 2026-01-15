import type {ReactNode} from 'react';
import {useState, useEffect, useRef} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

// アニメーションチャートコンポーネント
function AnimatedChart() {
  return (
    <div className={styles.chartBackground} aria-hidden="true">
      <svg className={styles.chartSvg} viewBox="0 0 1200 400" preserveAspectRatio="none">
        {/* ライン1: 上昇トレンド */}
        <path
          className={styles.chartLine1}
          d="M 0,300 Q 150,250 300,280 T 600,200 T 900,180 T 1200,150"
          fill="none"
          strokeWidth="2"
        />
        {/* ライン2: 変動 */}
        <path
          className={styles.chartLine2}
          d="M 0,320 Q 150,280 300,300 T 600,250 T 900,220 T 1200,200"
          fill="none"
          strokeWidth="2"
        />
        {/* ライン3: 下降から回復 */}
        <path
          className={styles.chartLine3}
          d="M 0,280 Q 150,300 300,260 T 600,240 T 900,260 T 1200,230"
          fill="none"
          strokeWidth="1.5"
        />
        {/* グリッド線 */}
        <g className={styles.gridLines}>
          <line x1="0" y1="100" x2="1200" y2="100" />
          <line x1="0" y1="200" x2="1200" y2="200" />
          <line x1="0" y1="300" x2="1200" y2="300" />
          <line x1="300" y1="0" x2="300" y2="400" />
          <line x1="600" y1="0" x2="600" y2="400" />
          <line x1="900" y1="0" x2="900" y2="400" />
        </g>
        {/* データポイント */}
        <circle className={styles.dataPoint} cx="300" cy="280" r="4" />
        <circle className={styles.dataPoint} cx="600" cy="200" r="4" />
        <circle className={styles.dataPoint} cx="900" cy="180" r="4" />
      </svg>
      {/* 移動カーソルライン */}
      <div className={styles.cursorLine}></div>
    </div>
  );
}

// フローティングデータカード
function FloatingDataCard({ index, delay }: { index: number; delay: number }) {
  const [value, setValue] = useState(100);
  const [trend, setTrend] = useState<'up' | 'down'>('up');

  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 10;
      setValue(prev => {
        const newValue = Math.max(50, Math.min(150, prev + change));
        setTrend(change > 0 ? 'up' : 'down');
        return newValue;
      });
    }, 2000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  const positions = [
    { top: '15%', left: '8%' },
    { top: '25%', right: '12%' },
    { bottom: '35%', left: '15%' },
    { top: '45%', right: '8%' },
  ];

  return (
    <div 
      className={clsx(styles.floatingCard, styles[`floatingCard${index}`])}
      style={{ 
        ...positions[index % positions.length],
        animationDelay: `${delay}s` 
      }}
    >
      <div className={styles.cardTitle}>Asset {index + 1}</div>
      <div className={styles.cardValue}>
        ${value.toFixed(2)}
        <span className={clsx(styles.cardTrend, trend === 'up' ? styles.trendUp : styles.trendDown)}>
          {trend === 'up' ? '↑' : '↓'}
        </span>
      </div>
      <svg className={styles.miniChart} viewBox="0 0 100 30" preserveAspectRatio="none">
        <path
          d={`M 0,${30 - (value / 5)} L 25,${30 - ((value + 10) / 5)} L 50,${30 - ((value - 5) / 5)} L 75,${30 - ((value + 8) / 5)} L 100,${30 - (value / 5)}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

// データストリーム
function DataStream() {
  const streams = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className={styles.dataStreamContainer} aria-hidden="true">
      {streams.map(i => (
        <div key={i} className={styles.streamColumn} style={{ left: `${12.5 * i}%` }}>
          <div className={styles.streamNumber} style={{ animationDelay: `${i * 0.3}s` }}>
            {Math.floor(Math.random() * 9999)}
          </div>
        </div>
      ))}
    </div>
  );
}

// カウントアップ統計コンポーネント
function StatItem({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref} className={styles.statItem}>
      <div className={styles.statValue}>
        {count}{suffix}
      </div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}

// スクロールインジケーター
function ScrollIndicator() {
  return (
    <div className={styles.scrollIndicator} aria-label="Scroll down">
      <div className={styles.scrollArrow}>↓</div>
    </div>
  );
}

// 波形SVG
function WaveDivider() {
  return (
    <div className={styles.waveDivider}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className={styles.waveSvg}
      >
        <path
          d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"
          className={styles.wavePath}
        />
      </svg>
    </div>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <AnimatedChart />
      <DataStream />
      <FloatingDataCard index={0} delay={0} />
      <FloatingDataCard index={1} delay={0.5} />
      <FloatingDataCard index={2} delay={1} />
      <FloatingDataCard index={3} delay={1.5} />
      
      <div className={clsx('container', styles.heroContainer)}>
        <Heading 
          as="h1" 
          className={clsx('hero__title', styles.heroTitle, isLoaded && styles.fadeIn)}
        >
          {siteConfig.title}
        </Heading>
        <p className={clsx('hero__subtitle', styles.heroSubtitle, isLoaded && styles.fadeInDelay1)}>
          {siteConfig.tagline}
        </p>
        <p className={clsx(styles.heroDescription, isLoaded && styles.fadeInDelay1)}>
          Transform your financial data into actionable insights with powerful visualization and analysis tools
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
        <div className={clsx(styles.statsContainer, isLoaded && styles.fadeInDelay3)}>
          <StatItem value={1000} label="Active Users" suffix="+" />
          <StatItem value={99.9} label="Uptime" suffix="%" />
          <StatItem value={50} label="Features" suffix="+" />
        </div>
      </div>
      <ScrollIndicator />
      <WaveDivider />
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

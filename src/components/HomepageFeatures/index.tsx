import type {ReactNode} from 'react';
import {useState, useEffect, useRef} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

// カスタムSVGアイコン: チャート/可視化
function ChartIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* 背景の円 */}
      <circle cx="100" cy="100" r="90" fill="var(--ifm-color-primary)" opacity="0.1"/>
      
      {/* グリッド線 */}
      <g stroke="var(--ifm-color-primary)" strokeWidth="1" opacity="0.2">
        <line x1="40" y1="150" x2="160" y2="150"/>
        <line x1="40" y1="120" x2="160" y2="120"/>
        <line x1="40" y1="90" x2="160" y2="90"/>
        <line x1="40" y1="60" x2="160" y2="60"/>
      </g>
      
      {/* バーチャート */}
      <rect x="50" y="100" width="20" height="50" fill="var(--ifm-color-primary)" opacity="0.6" rx="2"/>
      <rect x="80" y="80" width="20" height="70" fill="var(--ifm-color-primary)" opacity="0.7" rx="2"/>
      <rect x="110" y="60" width="20" height="90" fill="var(--ifm-color-primary)" opacity="0.8" rx="2"/>
      <rect x="140" y="70" width="20" height="80" fill="var(--ifm-color-primary)" rx="2"/>
      
      {/* ラインチャート */}
      <polyline
        points="45,130 75,110 105,90 135,100 165,80"
        fill="none"
        stroke="#10b981"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* データポイント */}
      <circle cx="45" cy="130" r="4" fill="#10b981"/>
      <circle cx="75" cy="110" r="4" fill="#10b981"/>
      <circle cx="105" cy="90" r="4" fill="#10b981"/>
      <circle cx="135" cy="100" r="4" fill="#10b981"/>
      <circle cx="165" cy="80" r="4" fill="#10b981"/>
    </svg>
  );
}

// カスタムSVGアイコン: データ分析
function AnalysisIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* 背景の円 */}
      <circle cx="100" cy="100" r="90" fill="var(--ifm-color-primary)" opacity="0.1"/>
      
      {/* 虫眼鏡の円 */}
      <circle cx="85" cy="85" r="40" fill="none" stroke="var(--ifm-color-primary)" strokeWidth="6"/>
      
      {/* 虫眼鏡のハンドル */}
      <line x1="115" y1="115" x2="140" y2="140" stroke="var(--ifm-color-primary)" strokeWidth="6" strokeLinecap="round"/>
      
      {/* 内部のグラフ */}
      <path
        d="M 65,95 L 75,85 L 85,90 L 95,75 L 105,80"
        fill="none"
        stroke="#10b981"
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* データポイント */}
      <circle cx="75" cy="85" r="3" fill="#10b981"/>
      <circle cx="85" cy="90" r="3" fill="#10b981"/>
      <circle cx="95" cy="75" r="3" fill="#10b981"/>
      
      {/* 装飾的な数値 */}
      <text x="60" y="105" fontSize="10" fill="var(--ifm-color-primary)" opacity="0.6">123</text>
      <text x="90" y="70" fontSize="10" fill="var(--ifm-color-primary)" opacity="0.6">456</text>
    </svg>
  );
}

// カスタムSVGアイコン: 統合/API
function IntegrationIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* 背景の円 */}
      <circle cx="100" cy="100" r="90" fill="var(--ifm-color-primary)" opacity="0.1"/>
      
      {/* 中央のハブ */}
      <circle cx="100" cy="100" r="20" fill="var(--ifm-color-primary)"/>
      
      {/* 接続線 */}
      <line x1="100" y1="80" x2="100" y2="40" stroke="var(--ifm-color-primary)" strokeWidth="3"/>
      <line x1="120" y1="100" x2="160" y2="100" stroke="var(--ifm-color-primary)" strokeWidth="3"/>
      <line x1="80" y1="100" x2="40" y2="100" stroke="var(--ifm-color-primary)" strokeWidth="3"/>
      <line x1="115" y1="115" x2="145" y2="145" stroke="var(--ifm-color-primary)" strokeWidth="3"/>
      <line x1="85" y1="115" x2="55" y2="145" stroke="var(--ifm-color-primary)" strokeWidth="3"/>
      
      {/* 外部ノード */}
      <circle cx="100" cy="40" r="12" fill="#10b981"/>
      <circle cx="160" cy="100" r="12" fill="#10b981"/>
      <circle cx="40" cy="100" r="12" fill="#10b981"/>
      <circle cx="145" cy="145" r="12" fill="#10b981"/>
      <circle cx="55" cy="145" r="12" fill="#10b981"/>
      
      {/* アイコン内の装飾 */}
      <path d="M 95,100 L 100,95 L 105,100 L 100,105 Z" fill="white"/>
      <circle cx="100" cy="40" r="4" fill="white"/>
      <circle cx="160" cy="100" r="4" fill="white"/>
      <circle cx="40" cy="100" r="4" fill="white"/>
      <circle cx="145" cy="145" r="4" fill="white"/>
      <circle cx="55" cy="145" r="4" fill="white"/>
    </svg>
  );
}

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Beautiful Visualizations',
    Svg: ChartIcon,
    description: (
      <>
        Transform complex financial data into stunning, interactive charts and graphs.
        Make data-driven decisions with clarity and confidence.
      </>
    ),
  },
  {
    title: 'Powerful Analysis',
    Svg: AnalysisIcon,
    description: (
      <>
        Advanced analytical tools designed for financial professionals.
        From basic metrics to sophisticated algorithms, we&apos;ve got you covered.
      </>
    ),
  },
  {
    title: 'Easy Integration',
    Svg: IntegrationIcon,
    description: (
      <>
        Seamlessly integrate fino into your existing workflow.
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

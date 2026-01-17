<!-- ---
id: start
title: Get Started
displayed_sidebar: getting_started_sidebar
---



とても良い視点です。
ここを曖昧にしたまま「魔法のように取れる」チュートリアルを出すと、後で必ず期待値ギャップが起きます。
なので「何が現実的に制限になるのか」「IF（インターフェース）として何を露出・考慮すべきか」を最初から明文化するのは、finoの思想にもかなり合っています。

以下、①現実に発生する制約の分類 → ②それをどうIFに反映すべきか → ③チュートリアル上の扱い方の順で整理します。

⸻

① 現実世界の開示データで必ず発生する差分・制約

A. 開示制度・法制度の違いによる制約

1. 開示タイミングの非同期性
	•	米国（SEC）
	•	10-K / 10-Q：四半期・年次で比較的厳格
	•	8-K：イベントドリブン（不定期）
	•	日本（TDnet）
	•	決算短信：速報性重視（監査前）
	•	有価証券報告書：後日、確定値
	•	適時開示：イベント単位（粒度が荒い）

問題点
	•	「同じ年度・四半期でも数値が異なる」
	•	「同一イベントが複数文書に分散する」

⸻

2. 開示義務の違い
	•	SEC：かなり網羅的（セグメント、報酬、リスク）
	•	TDnet：企業裁量が比較的広い

問題点
	•	ある項目が「存在しない」のか「未開示」なのか区別不能
	•	欠損値が意味を持つ

⸻

B. フォーマット・技術的制約

3. ファイル形式の違い

形式	特徴	制約
XBRL	構造化	taxonomy差が激しい
Inline XBRL	HTML + XBRL	パースが重い
HTML	人間向け	表構造が壊れている
PDF	最悪	機械可読性がほぼない

👉 「DataFrameになる」までの難易度が全然違う

⸻

4. タクソノミ（勘定科目定義）の非互換性
	•	US GAAP vs IFRS vs JP GAAP
	•	同じ「Revenue」でも定義が微妙に違う
	•	企業独自拡張タクソノミ

問題点
	•	機械的な正規化は必ず情報を失う
	•	完全統一は幻想

⸻

C. データ取得レイヤーの制約

5. レート制限・取得制限
	•	SEC：User-Agent必須、暗黙のレート制限
	•	TDnet：スクレイピング前提 or 非公式API

問題点
	•	バッチ実行と対話実行で挙動が変わる
	•	OSSとして「やっていいこと」の境界

⸻

6. データの再配布・保存制限
	•	一部PDFは再配布不可
	•	ローカル保存はOKだが公開はNGなど

⸻

D. データ品質の問題（避けられない）

7. 修正開示（Restatement）
	•	訂正有価証券報告書
	•	訂正決算短信

👉 「最新が正しい」とは限らない

⸻

8. 人間向け記述の曖昧さ
	•	「前年同期比で大幅増」
	•	表現だけで数値が書いていない

⸻

② これを踏まえた IF（設計上の考慮ポイント）

ここが一番重要です。

⸻

1. 「取得できる or できない」を二値で扱わない

❌ 悪いIF

df = fino.sec.get_financials("AAPL")

✅ 良いIF

result = fino.sec.get_financials("AAPL")

result.status        # success / partial / failed
result.coverage      # ["income_statement", "balance_sheet"]
result.source_forms  # ["10-K"]
result.limitations   # ["Segment data unavailable"]

👉 「部分成功」を第一級市民として扱う

⸻

2. データは常に「文脈付き」で返す

df, meta = filing.extract_financials()

meta = {
  "source": "SEC EDGAR",
  "form": "10-K",
  "taxonomy": "US-GAAP 2023",
  "is_audited": True,
  "revision": None
}

👉 DataFrameだけ返す設計は危険

⸻

3. 正規化レベルを明示的に選ばせる

financials = filing.extract_financials(
    normalize="strict"   # or "loose" / "raw"
)

	•	raw：XBRLほぼそのまま
	•	strict：finoが責任持てる範囲のみ
	•	loose：推定・補完あり（明示）

⸻

4. 欠損値の意味を区別する

NaN  # 未開示
None # 対応不可
0    # 実数ゼロ

または

df.attrs["missing_reason"] = {
  "SegmentRevenue": "Not disclosed in this filing"
}


⸻

5. 「公式だが不完全」を前提にする

IF上で明示するべきフラグ：

filing.is_preliminary   # 決算短信など
filing.is_audited
filing.is_restated


⸻

6. Storage / OTF は 結果 として扱う

finoのIFでは：

pipeline.run(storage=...)

でよく、
	•	Iceberg / Delta / Parquet は オプション
	•	「finoが前提とするもの」ではない

⸻

③ チュートリアルでどう扱うべきか（超重要）

チュートリアルではこう書くべき

1. 最初にこれを明示
開示データは制度・国・文書種別によって性質が大きく異なります。
finoはそれらを「隠す」のではなく、「扱える形にする」ことを目的としています。

⸻

2. 「うまくいく例」は最も条件が良いケースだけ
	•	SEC 10-K
	•	XBRLあり
	•	単一企業

👉 魔法の再現性を限定する

⸻

3. 制限は「後出し」ではなく「設計思想」として書く

## What fino can and cannot guarantee

- fino guarantees traceability to original filings
- fino does NOT guarantee that all companies expose the same fields
- fino does NOT guess missing numbers unless explicitly requested


⸻

まとめ（設計原則として）

finoが守るべき一文にすると：

fino abstracts access to original disclosures,
but never abstracts away their uncertainty.

この姿勢があれば、
	•	初心者 →「取れるところから始められる」
	•	上級者 →「制約を理解した上で大規模運用できる」

という両立が可能です。

次にやると良さそうなのは
👉 「finoのIF設計10原則」
👉 「Result / Metadata オブジェクトのスキーマ設計」

ここ、かなり良いところまで来てます。 -->
import { ChangeEvent, useCallback, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import {
  translateEnglishToTaralians,
  translateTaraliansToEnglish,
} from "taralians-language-translator";
import styles from "../styles/Home.module.css";

type TranslationDirection =
  | "auto"
  | "englishToTaralians"
  | "taraliansToEnglish";

const siteTitle = "ﾋｮｳｼﾞｭﾝｺﾞﾊﾜｶﾙｶ?";
const siteShortDescription = "英タ翻訳サイト";
const siteLongDescription = "英語とタラール語の相互翻訳サイト";

const translateRawText = (
  rawText: string,
  translationDirection: TranslationDirection
): string => {
  if (translationDirection === "auto") {
    if (/^\s*[a-zA-Z0-9"']/.test(rawText)) {
      return translateEnglishToTaralians(rawText);
    } else {
      return translateTaraliansToEnglish(rawText);
    }
  } else if (translationDirection === "englishToTaralians") {
    return translateEnglishToTaralians(rawText);
  } else if (translationDirection === "taraliansToEnglish") {
    return translateTaraliansToEnglish(rawText);
  } else {
    throw new Error("Invalid `translationDirection`.");
  }
};

const TranslationDirectionItem = (props: {
  checked: boolean;
  htmlId: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: TranslationDirection;
}) => {
  return (
    <li>
      <input
        checked={props.checked}
        id={props.htmlId}
        name="translation_direction"
        onChange={props.onChange}
        type="radio"
        value={props.value}
      />
      <label htmlFor={props.htmlId}>{props.label}</label>
    </li>
  );
};

export default function Home() {
  const [translationDirection, setTranslationDirection] =
    useState<TranslationDirection>("auto");
  const [rawText, setRawText] = useState("What is your name?");
  const onChangeTranslationDirection = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTranslationDirection(
        event.currentTarget.value === "auto"
          ? "auto"
          : event.currentTarget.value === "englishToTaralians"
          ? "englishToTaralians"
          : event.currentTarget.value === "taraliansToEnglish"
          ? "taraliansToEnglish"
          : "auto"
      );
    },
    []
  );
  const onChangeRawText = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setRawText(event.currentTarget.value);
    },
    []
  );
  const translatedText = translateRawText(rawText, translationDirection);
  return (
    <div className={styles.container}>
      <Head>
        <title>
          {siteTitle} - {siteShortDescription}
        </title>
        <meta name="description" content={siteLongDescription} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteLongDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{siteTitle}</h1>
        <p className={styles.description}>{siteLongDescription}</p>
        <div className={styles.grid}>
          <section className={styles.card}>
            <h2>ｺﾚｶﾞﾜｶﾗﾅｲ</h2>
            <ul className={styles.translationDirections}>
              <TranslationDirectionItem
                htmlId="translation_direction_1"
                value="auto"
                label="自動検出"
                onChange={onChangeTranslationDirection}
                checked={translationDirection === "auto"}
              />
              <TranslationDirectionItem
                htmlId="translation_direction_2"
                value="englishToTaralians"
                label="英語"
                onChange={onChangeTranslationDirection}
                checked={translationDirection === "englishToTaralians"}
              />
              <TranslationDirectionItem
                htmlId="translation_direction_3"
                value="taraliansToEnglish"
                label="タラール語"
                onChange={onChangeTranslationDirection}
                checked={translationDirection === "taraliansToEnglish"}
              />
            </ul>
            <div>
              <textarea onChange={onChangeRawText} value={rawText}></textarea>
              <div className={styles.arrowDown}>
                <div />
              </div>
              <textarea readOnly={true} value={translatedText}></textarea>
            </div>
            <ul>
              <li>
                ダブルクォーテーション(<code>&quot;</code>
                )やシングルクォーテーション(<code>&apos;</code>){" "}
                で括った部分は翻訳対象から除外します。
              </li>
              <li>
                翻訳アルゴリズムは{" "}
                <a href="https://w.atwiki.jp/aniwotawiki/pages/35560.html">
                  アニヲタWiki(仮) - タラール語
                </a>{" "}
                を参考にしています。
              </li>
            </ul>
          </section>
          <section className={styles.card}>
            <h2>ｻｧ、ﾄﾞｰｽﾙ?</h2>
            <ul className={styles.links}>
              <li>
                <a href="https://github.com/kjirou/taralians-language-translation-site/issues">
                  この GitHub リポジトリの Issues
                </a>
                <span>もし何か要望等あれば雑にどうぞ。</span>
              </li>
            </ul>
          </section>
          <section className={styles.card}>
            <h2>ﾏｧｺﾝﾅﾓﾉﾀﾞﾛｳ</h2>
            <ul className={styles.links}>
              <li>
                <a href="https://www.jp.square-enix.com/saga_minstrelsong/">
                  Romancing SaGa -Minstrel Song- Remastered
                </a>
                <span>タラール語やナイトハルト殿下が出てくるゲームだよ！</span>
              </li>
              <li>
                <a href="https://github.com/kjirou/taralians-language-translator">
                  kjirou/taralians-language-translator
                </a>
                <span>翻訳処理だけを切り出した npm package です。</span>
              </li>
              <li>
                <a href="https://github.com/kjirou/taralians-language-translation-site">
                  GitHub
                </a>
              </li>
            </ul>
          </section>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

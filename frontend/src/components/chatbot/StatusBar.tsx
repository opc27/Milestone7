import React from "react";
import styles from "./ChatInterface.module.css";

export const StatusBar = () => {
  return (
    <header className={styles.statusBar}>
      <div className={styles.statusBarContent}>
        <time className={styles.time}>9:41</time>
        <div className={styles.statusIcons} />
        <div
          dangerouslySetInnerHTML={{
            __html:
              '<svg id="I2006:2166;2001:2906;128:71948" layer-name="Levels" width="135" height="14" viewBox="0 0 135 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="flex-1"> <path fill-rule="evenodd" clip-rule="evenodd" d="M42.9378 2.33891C42.9378 1.70587 42.4602 1.19269 41.8711 1.19269H40.8045C40.2154 1.19269 39.7378 1.70587 39.7378 2.33891V12.2729C39.7378 12.9059 40.2154 13.4191 40.8045 13.4191H41.8711C42.4602 13.4191 42.9378 12.9059 42.9378 12.2729V2.33891ZM35.5037 3.63797H36.5703C37.1594 3.63797 37.637 4.16347 37.637 4.81171V12.2454C37.637 12.8936 37.1594 13.4191 36.5703 13.4191H35.5037C34.9146 13.4191 34.437 12.8936 34.437 12.2454V4.81171C34.437 4.16347 34.9146 3.63797 35.5037 3.63797ZM31.1719 6.28702H30.1052C29.5161 6.28702 29.0386 6.81921 29.0386 7.4757V12.2304C29.0386 12.8869 29.5161 13.4191 30.1052 13.4191H31.1719C31.761 13.4191 32.2386 12.8869 32.2386 12.2304V7.4757C32.2386 6.81921 31.761 6.28702 31.1719 6.28702ZM25.8711 8.73231H24.8045C24.2154 8.73231 23.7378 9.2569 23.7378 9.90401V12.2474C23.7378 12.8945 24.2154 13.4191 24.8045 13.4191H25.8711C26.4602 13.4191 26.9378 12.8945 26.9378 12.2474V9.90401C26.9378 9.2569 26.4602 8.73231 25.8711 8.73231Z" fill="black"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M58.5093 3.60804C60.9964 3.60814 63.3884 4.53022 65.1909 6.1837C65.3267 6.31136 65.5436 6.30975 65.6773 6.18009L66.9748 4.91663C67.0425 4.85087 67.0802 4.76179 67.0796 4.66911C67.0791 4.57643 67.0403 4.48778 66.9718 4.42279C62.2408 0.0480754 54.7771 0.0480754 50.046 4.42279C49.9775 4.48774 49.9386 4.57635 49.938 4.66903C49.9374 4.76171 49.975 4.85082 50.0427 4.91663L51.3405 6.18009C51.4741 6.30994 51.6913 6.31155 51.8269 6.1837C53.6297 4.53011 56.0219 3.60803 58.5093 3.60804ZM58.5059 7.82831C59.8633 7.82823 61.1721 8.33997 62.1783 9.2641C62.3143 9.39525 62.5287 9.39241 62.6614 9.25769L63.9486 7.93838C64.0164 7.86918 64.054 7.7753 64.0531 7.67775C64.0521 7.5802 64.0126 7.48712 63.9434 7.41933C60.8796 4.52848 56.1349 4.52848 53.071 7.41933C53.0018 7.48711 52.9623 7.58024 52.9614 7.67783C52.9605 7.77541 52.9983 7.86928 53.0662 7.93838L54.3531 9.25769C54.4858 9.39241 54.7001 9.39525 54.8362 9.2641C55.8417 8.34058 57.1495 7.82888 58.5059 7.82831ZM61.0304 10.6219C61.0323 10.7272 60.9952 10.8288 60.9279 10.9026L58.7513 13.3573C58.6875 13.4295 58.6005 13.4701 58.5097 13.4701C58.4189 13.4701 58.3319 13.4295 58.2681 13.3573L56.0911 10.9026C56.0238 10.8287 55.9868 10.7271 55.9888 10.6218C55.9908 10.5164 56.0316 10.4167 56.1016 10.346C57.4917 9.03215 59.5277 9.03215 60.9178 10.346C60.9877 10.4167 61.0284 10.5165 61.0304 10.6219Z" fill="black"></path> <rect opacity="0.35" x="74.5796" y="1.30591" width="24" height="12" rx="3.8" stroke="black"></rect> <path opacity="0.4" d="M100.08 5.58704V9.66251C100.884 9.31734 101.408 8.51438 101.408 7.62477C101.408 6.73516 100.884 5.9322 100.08 5.58704Z" fill="black"></path> <rect x="76.0796" y="2.80591" width="21" height="9" rx="2.5" fill="black"></rect> </svg>',
          }}
        />
      </div>
    </header>
  );
};

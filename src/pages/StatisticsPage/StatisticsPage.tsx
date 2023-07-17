import React, { useEffect, useRef, useState } from 'react';
import styles from './statisticspage.module.css';
import moment from 'moment';
import 'moment/locale/ru';
import { IStatItem } from '../../store/slice/statSlice';
import { useAppSelector } from '../../hooks/hooks';
import { StatDay } from '../../components/StatDay';
import { StatChart } from '../../components/StatChart';
import { StatPomodoro } from '../../components/StatPomodoro';
import { StatFocus } from '../../components/StatFocus';
import { StatPause } from '../../components/StatPause';
import { StatStop } from '../../components/StatStop';

moment.locale('ru');

const emptyStatDay: IStatItem = {
  date: moment().format('YYYY-MM-DD'),
  count: 0,
  stop_count: 0,
  work_sec: 0,
  pause_sec: 0,
}

export enum ChartMode {
  CurrentWeek,
  LastWeek,
  TwoWeeksAgo
}

const ChartModes = [
  {
    name: 'Эта неделя',
    value: ChartMode.CurrentWeek
  },
  {
    name: 'Прошедшая неделя',
    value: ChartMode.LastWeek
  },
  {
    name: '2 недели назад',
    value: ChartMode.TwoWeeksAgo
  }
];

export function StatisticsPage() {
  const statItems = useAppSelector(state => state.stat.items);

  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'))
  const [statDay, setStatDay] = useState(emptyStatDay);
  const [selectedDayName, setSelectedDayName] = useState(moment().format('dddd'));
  const [selectedChartMode, setSelectedChartMode] = useState<ChartMode>(ChartMode.CurrentWeek);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const day = moment(selectedDate).format('dddd');
    setSelectedDayName(day[0].toUpperCase() + day.slice(1));

    let foundStatItem = statItems.find(item => item.date === selectedDate);

    if (foundStatItem) {
      setStatDay(foundStatItem);
    } else {
      setStatDay({
        date: selectedDate,
        count: 0,
        stop_count: 0,
        work_sec: 0,
        pause_sec: 0,
      });
    }
  }, [selectedDate]);

  useEffect(() => {
    switch (selectedChartMode) {
      case ChartMode.CurrentWeek:
        setSelectedDate(moment().format('YYYY-MM-DD'));
        break;
      case ChartMode.LastWeek:
        setSelectedDate(moment().subtract(7, 'days').format('YYYY-MM-DD'));
        break;
      case ChartMode.TwoWeeksAgo:
        setSelectedDate(moment().subtract(14, 'days').format('YYYY-MM-DD'));
        break;
    }
  }, [selectedChartMode]);

  const handleSelectedDateHandler = (selectedDate: string) => {
    setSelectedDate(selectedDate);
  }

	const handleSelectMode = (selectedMode: ChartMode) => {
		setSelectedChartMode(selectedMode);
		setIsSelectOpen(false);
	}

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.target instanceof Node && !ref.current?.contains(event.target)) {
        setIsSelectOpen(false);
      }

    }
    document.addEventListener('click', handleClick);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Ваша активность</h2>
        <div className={styles.dropdown} ref={ref}>
          <div className={styles.menu} onClick={() => !isSelectOpen ? setIsSelectOpen(true) : setIsSelectOpen(false)}>
            {ChartModes.find(chartMode => chartMode.value === selectedChartMode)?.name}
            <div className={`${styles.arrow} ${isSelectOpen ? styles.active : ''}`}>
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 1L8 8L1 1" stroke="#B7280F" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {isSelectOpen && (
            <ul className={styles.menuList}>
              {ChartModes.map((item, index) => {
                return (
                  <li className={`${styles.menuItem} ${index === selectedChartMode ? styles.hidden : ''}`}
                    key={item.value}>
                    <button
                      className={styles.menuBtn}
                      key={item.value}
                      onClick={() => handleSelectMode(item.value)}
                    >
                      {item.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

        </div>
      </div>
      <div className={styles.blocks}>
        <StatDay selectedDayName={selectedDayName} workInSec={statDay.work_sec} />
        <StatChart selectedChartMode={selectedChartMode} selectedDate={selectedDate} changeSelectedDate={handleSelectedDateHandler} />
        <StatPomodoro pomodoroCount={statDay.count}/>
        <StatFocus pauseSec={statDay.pause_sec} workInSec={statDay.work_sec}/>
        <StatPause pauseSec={statDay.pause_sec}/>
        <StatStop stopCount={statDay.stop_count}/>
      </div>
    </div>

  )
}

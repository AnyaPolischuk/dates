import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import MotionPathPlugin from "gsap/MotionPathPlugin";

import { data } from "../../data";
import styles from './CircularCarousel.module.scss';

export const CircularCarousel = () => {
  const [activeItem, setActiveItem] = useState<number>(0);

  const svgRef = useRef<SVGSVGElement>(null);
  const allItemsRef = useRef<null | HTMLDivElement[]>(null);
  const itemsLengthRef = useRef<number>(0);
  const itemStepRef = useRef<number>(0);
  const trackerRef = useRef<{ item: number }>();
  const tlRef = useRef(gsap.timeline({ paused:true, reversed: false }));
  const wrapTrackerRef = useRef(gsap.utils.wrap(0, 0));
  const wrapProgressRef = useRef(gsap.utils.wrap(0, 0));
  const snapRef = useRef(gsap.utils.snap(0));
  
  useLayoutEffect(() => {
    gsap.registerPlugin(MotionPathPlugin);

    const circlePath = MotionPathPlugin.convertToPath("#holder", false)[0];
    circlePath.id = "circlePath";

    if (svgRef.current) {
      svgRef.current.prepend(circlePath);
    }

    allItemsRef.current = gsap.utils.toArray(".elem");
    itemsLengthRef.current = allItemsRef.current.length;
    itemStepRef.current = 1 / itemsLengthRef.current;
    wrapProgressRef.current = gsap.utils.wrap(0, 1);
    snapRef.current = gsap.utils.snap(itemStepRef.current);
    wrapTrackerRef.current = gsap.utils.wrap(0, itemsLengthRef.current);
    trackerRef.current = { item: 0 };

    //@ts-ignore
    gsap.set(allItemsRef.current, { motionPath: {
      path: circlePath,
      align: circlePath,
      alignOrigin: [0.5, 0.5],
      end: (i: number): number => i / itemsLengthRef.current
    }, scale: 0.9 
    });

    tlRef.current = gsap.timeline({ paused:true, reversed: true });

    tlRef.current.to('.wrapper', {
      rotation: 360, 
      transformOrigin: 'center', 
      duration: 1, 
      ease: 'none'
    });

    tlRef.current.to(allItemsRef.current, {
      rotation: "-=360", 
      transformOrigin: 'center', 
      duration: 1, 
      ease: 'none',
    }, 0);

    tlRef.current.to(trackerRef.current, {
      item: itemsLengthRef.current,
      duration: 1, 
      ease: 'none',
      modifiers: {
        item(value) {
          return wrapTrackerRef.current(itemsLengthRef.current - Math.round(value))
        }
      }
    }, 0);
  }, [])

  function itemClickHandler(index: number) {
    let current = trackerRef.current!.item;
    let activeItem = index;

    if (index === current) {
      return;
    }

    let diff = current! - index;

    setActiveItem(activeItem);

    if (Math.abs(diff) < itemsLengthRef.current / 2) {
        moveWheel(diff * itemStepRef.current);
      } else {

      let amt = itemsLengthRef.current - Math.abs(diff);

      if (current > index) {
        moveWheel(amt * -itemStepRef.current);
      } else {
        moveWheel(amt * itemStepRef.current);
      }
    }}

  function moveWheel(amount: number) {
    let progress = tlRef.current.progress();
    
    tlRef.current.progress(wrapProgressRef.current(snapRef.current(progress + amount)))
    tlRef.current.progress(progress);
  
    gsap.to(tlRef.current, {
      progress: snapRef.current(progress + amount),
      modifiers: {
        progress: wrapProgressRef.current
      }
    });
  }
  
  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.wrapper} wrapper`}>
          {data.map((item, index) => 
            <div
              onClick={() => itemClickHandler(index)}
              key={item.id}
              className={`${styles.item} ${activeItem === index ? 'active' : ''} elem`}
            >
              {item.id}
            </div>
          )}
          <svg ref={svgRef} viewBox="0 0 300 300">
            <circle id='holder' className={styles.st0} cx="151" cy="151" r="150"/>
          </svg>
        </div>
        <div className={styles.start}>&#8592; Active</div>
    </div>
    <div className={styles.container} style={{ textAlign: 'center' }}>
      <button onClick={() => moveWheel(-itemStepRef.current)} className={styles.prev}>Prev</button>
      <button onClick={() => moveWheel(itemStepRef.current)} className={styles.next}>Next</button>
    </div>
    </>
  )
}

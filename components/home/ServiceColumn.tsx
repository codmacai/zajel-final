"use client";

import Image from "next/image";
import Link from "next/link";
import { useReveal } from "@/lib/useReveal";
import { ArrowIcon } from "./ServiceIcons";
import type { ServiceCategory } from "@/data/services";
import styles from "./ServicesSection.module.css";

export default function ServiceColumn({
  category,
  index,
  register,
}: {
  category: ServiceCategory;
  index: number;
  register: (node: Element, onVisible: () => void) => void;
}) {
  const { ref, isVisible } = useReveal<HTMLDivElement>(register);
  const Icon = category.icon;

  return (
    <div
      ref={ref}
      className={`${styles.serviceCard} ${isVisible ? styles.isVisible : ""}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className={styles.serviceCardStrip}>
        <Image
          src={category.image}
          alt={category.title}
          fill
          sizes="(max-width: 899px) 100vw, 33vw"
          className={styles.serviceCardStripImg}
          loading="lazy"
        />
        <div className={styles.serviceCardStripTint} />
      </div>

      <div className={styles.serviceCardIconWrap}>
        <Icon className={styles.serviceCardIconSvg} />
      </div>

      <div className={styles.serviceCardBody}>
        <h3 className={styles.serviceCardTitle}>
          {category.title}
        </h3>
        <p className={styles.serviceCardDesc}>
          {category.description}
        </p>

        <div className={styles.serviceCardLinks} data-cols={category.subServices.length > 3 ? 2 : 1}>
          {category.subServices.map((sub, i) => (
            <Link
              key={`${sub.href}-${i}`}
              href={sub.href}
              className={styles.serviceSubLink}
              style={{ transitionDelay: `${index * 80 + i * 40}ms` }}
            >
              <span>{sub.label}</span>
              <ArrowIcon className={styles.serviceSubLinkIcon} />
            </Link>
          ))}
        </div>

        <Link href={category.path} className={styles.serviceCardCta}>
          <span>{category.ctaLabel}</span>
          <div className={styles.serviceCardCtaCircle}>
            <ArrowIcon className={styles.serviceCardCtaIcon} />
          </div>
        </Link>
      </div>

      <div className={styles.serviceCardShadowLayer} aria-hidden="true" />
    </div>
  );
}
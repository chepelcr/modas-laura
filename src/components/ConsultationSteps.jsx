import { useLocale } from "../i18n/LocaleContext.jsx";
import { useRef, useState } from "react";
import {
  Button,
  Card,
  Container,
  Eyebrow,
  Heading,
  Icon,
  IconButton,
} from "../design-system/Primitives.jsx";
import { consultationSteps, whatsapp } from "../content/site.js";
export function ConsultationSteps() {
  const { t } = useLocale();
  const [index, setIndex] = useState(0);
  const content = useRef(null),
    previous = useRef(null),
    next = useRef(null);
  const step = consultationSteps[index];
  const href = step.href.startsWith("https:")
    ? whatsapp(t(new URL(step.href).searchParams.get("text")))
    : step.href;
  function change(direction) {
    const newIndex = Math.max(
      0,
      Math.min(consultationSteps.length - 1, index + direction),
    );
    setIndex(newIndex);
    if (newIndex === 0) next.current.focus({ preventScroll: true });
    if (newIndex === consultationSteps.length - 1)
      previous.current.focus({ preventScroll: true });
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      content.current
        .getAnimations()
        .forEach((animation) => animation.cancel());
      content.current.animate(
        [
          { opacity: 0.5, transform: `translateX(${direction * 12}px)` },
          { opacity: 1, transform: "translateX(0)" },
        ],
        { duration: 250, easing: "ease-out" },
      );
    }
  }
  return (
    <section className="process-section section">
      <Container>
        <div className="section-heading centered">
          <Eyebrow>{t("Estamos para ayudarte")}</Eyebrow>
          <Heading>
            {t("Una conversación.")}
            <br />
            <em>{t("El comienzo de tu elección.")}</em>
          </Heading>
        </div>
        <Card as="div" className="process-card reveal" data-reveal="">
          <div className="process-top">
            <span>{t("Cómo consultar")}</span>
            <span>0{index + 1} / 03</span>
          </div>
          <div className="process-controls">
            <IconButton
              ref={previous}
              label={t("Paso anterior")}
              aria-controls="process-content"
              disabled={index === 0}
              onClick={() => change(-1)}
            >
              <Icon className="previous-arrow" />
            </IconButton>
            <div className="process-symbol">
              <span className="ring ring-one" />
              <span className="ring ring-two" />
              <div data-step-icon="">
                <Icon name={step.icon} />
              </div>
            </div>
            <IconButton
              ref={next}
              label={t("Paso siguiente")}
              aria-controls="process-content"
              disabled={index === consultationSteps.length - 1}
              onClick={() => change(1)}
            >
              <Icon />
            </IconButton>
          </div>
          <div id="process-content" ref={content} className="process-content">
            <div role="status" aria-live="polite" aria-atomic="true">
              <Heading as="h3">{t(step.title)}</Heading>
              <p>{t(step.description)}</p>
            </div>
            <Button
              variant="text"
              href={href}
              {...(step.href.startsWith("https:")
                ? { target: "_blank", rel: "noopener" }
                : {})}
            >
              {t(step.label)}
              <Icon />
            </Button>
          </div>
          <div
            className="process-progress"
            role="group"
            aria-label={`${t("Paso")} ${index + 1} ${t("de")} 3`}
          >
            {consultationSteps.map((item, i) => (
              <span
                key={item.id}
                className={index === i ? "active" : undefined}
              />
            ))}
          </div>
        </Card>
      </Container>
    </section>
  );
}

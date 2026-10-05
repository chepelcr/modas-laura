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
import { consultationSteps } from "../content/site.js";
export function ConsultationSteps() {
  const [index, setIndex] = useState(0);
  const content = useRef(null),
    previous = useRef(null),
    next = useRef(null);
  const step = consultationSteps[index];
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
          <Eyebrow>Estamos para ayudarte</Eyebrow>
          <Heading>
            Una conversación.
            <br />
            <em>El comienzo de tu elección.</em>
          </Heading>
        </div>
        <Card as="div" className="process-card reveal" data-reveal="">
          <div className="process-top">
            <span>Cómo consultar</span>
            <span>0{index + 1} / 03</span>
          </div>
          <div className="process-controls">
            <IconButton
              ref={previous}
              label="Paso anterior"
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
              label="Paso siguiente"
              aria-controls="process-content"
              disabled={index === consultationSteps.length - 1}
              onClick={() => change(1)}
            >
              <Icon />
            </IconButton>
          </div>
          <div id="process-content" ref={content} className="process-content">
            <div role="status" aria-live="polite" aria-atomic="true">
              <Heading as="h3">{step.title}</Heading>
              <p>{step.description}</p>
            </div>
            <Button
              href={step.href}
              {...(step.href.startsWith("https:")
                ? { target: "_blank", rel: "noopener" }
                : {})}
            >
              {step.label}
              <Icon />
            </Button>
          </div>
          <div
            className="process-progress"
            role="group"
            aria-label={`Paso ${index + 1} de 3`}
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

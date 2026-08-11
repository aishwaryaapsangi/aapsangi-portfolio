import React from "react";
import Button from "./Button";
import "../styles/Intro.css";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import FadeInSection from "./FadeInSection";
import ParticlePortrait from "./ParticlePortrait";

class Intro extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: true,
      activeKey: "1",
      visible: true,
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey,
    });
  }
  render() {
    return (
      <div id="intro">
        <div className="intro-simulation">
          <ParticlePortrait />
        </div>
        <div className="intro-block">
            <div className="inline-flex mb-4 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3 py-1">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-xs text-[var(--slate)]">
              Available for freelance work
            </span>
          </div>
          <Typist avgTypingDelay={120}>
            <span className="intro-title">
              {"hi, "}
              <span className="intro-name">{"aishwarya"}</span>
              {" here."}
            </span>
          </Typist>
          <FadeInSection>
            <div className="intro-desc">
              I'm a software engineer and artist based in New York City. I'm
              fascinated by large-scale, high-impact products and contributed to
              major feature launches in industry-leading services as well as
              apps that have 100M+ installs.
            </div>
            <div className="staggered-reveal pt-4">
              <Button href="mailto:aishwaryaapsangi25@gmail.com" classes="link" type="primary">
                Let&apos;s Talk
              </Button>
            </div>
          </FadeInSection>
        </div>
      </div>
    );
  }
}

export default Intro;

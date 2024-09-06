import React from "react";
import "../styles/f1.css";

interface F1PageHeadingProps {
  title: string;
  season?: string;
  responseType?: string;
}
const F1PageHeading: React.FC<F1PageHeadingProps> = ({
  title,
  season,
  responseType,
}) => {
  return (
    <div className="f1-container container">
      <div className="f1-inner-wrapper flex flex-col gap-xl f1-utls-inner-padding-y">
        <div className="border-t-thick border-r-thick rounded-tr-l f1-utils-inner-padding-tr--half border-brand-black flex">
          <div className="mb-s mb-0 w-[66%]">
            <h1 className="f1-heading-black font-formulaOne tracking-normal font-black non-italic text-fs-32px lg:text-fs-62px leading-tight sm:leading-none">
              {title}
            </h1>
            <p className="f1-heading tracking-normal text-fs-12px leading-tight uppercase font-normal non-italic f1-heading__body font-formulaOne">
              2024 FIA FORMULA ONE WORLD CHAMPIONSHIP™ CIRCUITs
            </p>
          </div>

          <div className="w-[33%]">
            <div className="flex gap-normal desktop:justify-end flex-col tablet:flex-row">
              <div
                className="flex"
                role="button"
                id="scheduleHeaderEventButton"
              >
                <div className="bg-brand-primary flex flex-col justify-center px-s f1-utils-inline-image rounded-tl-xxs rounded-bl-xxs">
                  <svg
                    aria-label="chevron-down"
                    className="f1-icon text-white opacity-40"
                    viewBox="0 0 1024 1024"
                  >
                    <path d="M226.24 466.705l59.521-61.148 193.075 187.952c17.229 17.556 45.423 17.744 63.417-0.107l196.224-188.075 59.047 61.605-195.691 187.555c-51.047 50.666-133.532 50.114-183.209-0.519l-192.384-187.264z"></path>
                  </svg>
                  <svg
                    aria-label="chevron-down"
                    className="f1-icon text-white opacity-70 -mt-6"
                    viewBox="0 0 1024 1024"
                  >
                    <path d="M226.24 466.705l59.521-61.148 193.075 187.952c17.229 17.556 45.423 17.744 63.417-0.107l196.224-188.075 59.047 61.605-195.691 187.555c-51.047 50.666-133.532 50.114-183.209-0.519l-192.384-187.264z"></path>
                  </svg>
                  <svg
                    aria-label="chevron-down"
                    className="f1-icon text-white opacity-100 -mt-6"
                    viewBox="0 0 1024 1024"
                  >
                    <path d="M226.24 466.705l59.521-61.148 193.075 187.952c17.229 17.556 45.423 17.744 63.417-0.107l196.224-188.075 59.047 61.605-195.691 187.555c-51.047 50.666-133.532 50.114-183.209-0.519l-192.384-187.264z"></path>
                  </svg>
                </div>
                <div className="bg-brand-white text-brand-carbonBlack border-grey-30 border-2 border-l-0 relative px-xs rounded-tr-xxs rounded-br-xxs py-xxs grid place-content-center justify-start flex-auto">
                  <div className="flex">
                    <span className="f1-heading tracking-normal text-fs-12px leading-tight uppercase font-bold non-italic f1-heading__body font-formulaOne text-brand-primary">
                      Next-ROUND 17
                    </span>
                  </div>
                  <div className="flex-row f1-utils-inline-image">
                    <div>
                      <span className="f1-heading tracking-normal text-fs-18px leading-tight uppercase font-bold non-italic f1-heading__body font-formulaOne">
                        Azerbaijan{" "}
                      </span>
                      <span className="f1-heading tracking-normal text-fs-18px leading-tight normal-case font-normal non-italic f1-heading__card font-formulaOneDigits">
                        2024
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default F1PageHeading;

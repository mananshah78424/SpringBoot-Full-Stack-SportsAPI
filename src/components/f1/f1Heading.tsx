import React from "react";
import "../../styles/f1.css";

interface F1PageHeadingProps {
  title: string;
  subtitle?: string;
  season?: string;
  responseType?: string;
}
const F1PageHeading: React.FC<F1PageHeadingProps> = ({
  title,
  subtitle,
  season,
  responseType,
}) => {
  return (
    <div className="f1-container container mb-10">
      <div className="f1-inner-wrapper flex flex-col gap-xl f1-utls-inner-padding-y">
        <div className="border-t-thick border-r-thick rounded-tr-l f1-utils-inner-padding-tr--half border-brand-black flex">
          <div className="mb-s mb-0">
            <h1 className="f1-heading-black font-f1NavbarFont tracking-normal font-black non-italic text-fs-32px lg:text-fs-62px leading-tight sm:leading-none">
              {title}
            </h1>
            <p className="f1-heading tracking-normal text-fs-12px leading-tight uppercase font-normal non-italic f1-heading__body font-formulaOne">
              {subtitle}
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

const Footer = () => {
  return (
    <footer className="bg-black py-4">
      <div className="container mx-auto">
        <div className="w-28 mx-auto py-6 relative">
          <a href="https://www.formula1.com/" className="block cursor-pointer">
            <span
              style={{
                boxSizing: "border-box",
                display: "block",
                overflow: "hidden",
                width: "initial",
                height: "initial",
                background: "none",
                opacity: 1,
                border: 0,
                margin: 0,
                padding: 0,
                position: "relative",
              }}
            >
              <span
                style={{
                  boxSizing: "border-box",
                  display: "block",
                  width: "initial",
                  height: "initial",
                  background: "none",
                  opacity: 1,
                  border: 0,
                  margin: 0,
                  padding: 0,
                  paddingTop: "25%",
                }}
              />
              <img
                alt=""
                src="https://media.formula1.com/f_auto,c_limit,w_3840,q_auto/common/logos/f1_logo_white_pssdvx"
                decoding="async"
                className="absolute inset-0 box-border m-auto w-0 h-0 min-w-full max-w-full min-h-full max-h-full"
                sizes="33vw"
                srcSet="https://media.formula1.com/f_auto,c_limit,w_256,q_auto/common/logos/f1_logo_white_pssdvx 256w, 
                         https://media.formula1.com/f_auto,c_limit,w_384,q_auto/common/logos/f1_logo_white_pssdvx 384w, 
                         https://media.formula1.com/f_auto,c_limit,w_640,q_auto/common/logos/f1_logo_white_pssdvx 640w, 
                         https://media.formula1.com/f_auto,c_limit,w_750,q_auto/common/logos/f1_logo_white_pssdvx 750w, 
                         https://media.formula1.com/f_auto,c_limit,w_828,q_auto/common/logos/f1_logo_white_pssdvx 828w, 
                         https://media.formula1.com/f_auto,c_limit,w_1080,q_auto/common/logos/f1_logo_white_pssdvx 1080w, 
                         https://media.formula1.com/f_auto,c_limit,w_1200,q_auto/common/logos/f1_logo_white_pssdvx 1200w, 
                         https://media.formula1.com/f_auto,c_limit,w_1920,q_auto/common/logos/f1_logo_white_pssdvx 1920w, 
                         https://media.formula1.com/f_auto,c_limit,w_2048,q_auto/common/logos/f1_logo_white_pssdvx 2048w, 
                         https://media.formula1.com/f_auto,c_limit,w_3840,q_auto/common/logos/f1_logo_white_pssdvx 3840w"
              />
            </span>
          </a>
        </div>
        <div className="border-y border-gray-700 mx-2">
          <ul className="flex flex-wrap mx-0 my-3 sm:my-0 lg:mx-6 font-semibold text-center">
            {[
              {
                text: "Privacy Policy",
                href: "https://account.formula1.com/#/en/privacy-policy",
              },
              {
                text: "Cookie Policy",
                href: "https://account.formula1.com/#/en/cookie-policy",
              },
              { text: "Cookie Preferences", href: "#", isDiv: true },
              {
                text: "Terms of use",
                href: "https://account.formula1.com/#/en/terms-of-use",
              },
              {
                text: "Subscription Terms",
                href: "https://account.formula1.com/#/en/subscription-terms.mobile",
              },
              { text: "FAQs", href: "https://support.f1.tv/s/?language=en_US" },
            ].map((item, index) =>
              item.isDiv ? (
                <li
                  key={index}
                  className="text-white py-3 md:py-4 w-2/4 md:w-auto font-semibold md:inline-block md:mx-4 lg:mx-8"
                >
                  <div className="cursor-pointer">{item.text}</div>
                </li>
              ) : (
                <li
                  key={index}
                  className="text-white py-3 md:py-4 w-2/4 md:w-auto font-semibold md:inline-block md:mx-4 lg:mx-8"
                >
                  <a href={item.href} className="cursor-pointer">
                    {item.text}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
        <div className="text-gray-400 text-sm text-right py-6 mx-2.5 font-semibold">
          © 2003 - 2024 Formula One World Championship Limited
        </div>
      </div>
    </footer>
  );
};

export default Footer;

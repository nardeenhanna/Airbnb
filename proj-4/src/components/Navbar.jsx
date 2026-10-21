import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePickerModal from './DatePickerModal';
import { FaAirbnb } from "react-icons/fa";
import {
  TbWorld,
  TbMenu2,
  TbSearch,
  TbQuestionMark,
  TbX,
  TbNavigation,
  TbBuildingSkyscraper,
  TbChevronLeft,
  TbChevronRight,
  TbChevronDown,
  TbCalendar,
  TbPlus,
  TbMinus,
  TbHeart,
  TbMessage,
  TbUser,
  TbBell,
  TbSettings,
} from "react-icons/tb";
import { useTranslation } from "react-i18next";

// الوجهات المقترحة
const suggestedDestinations = [
  {
    title: "Nearby",
    subtitle: "Find what's around you",
    icon: <TbNavigation size={22} className="text-blue-600" />,
    bgColor: "bg-blue-50",
  },
  {
    title: "New Cairo, Egypt",
    subtitle: "For a trip abroad",
    icon: <TbBuildingSkyscraper size={22} className="text-pink-500" />,
    bgColor: "bg-pink-50",
  },
  {
    title: "Cairo, Egypt",
    subtitle: "For sights like Khan el-Khalili",
    icon: <TbBuildingSkyscraper size={22} className="text-amber-600" />,
    bgColor: "bg-amber-50",
  },
  {
    title: "Sheikh Zayed City, Egypt",
    subtitle: "For a trip abroad",
    icon: <TbBuildingSkyscraper size={22} className="text-orange-500" />,
    bgColor: "bg-orange-50",
  },
  {
    title: "Alexandria, Egypt",
    subtitle: "For its seaside allure",
    icon: <TbBuildingSkyscraper size={22} className="text-red-400" />,
    bgColor: "bg-red-50",
  },
  {
    title: "6th of October City, Egypt",
    subtitle: "For a trip abroad",
    icon: <TbBuildingSkyscraper size={22} className="text-sky-500" />,
    bgColor: "bg-sky-50",
  },
  {
    title: "Hurghada, Egypt",
    subtitle: "For seaside getaways",
    icon: <TbBuildingSkyscraper size={22} className="text-rose-400" />,
    bgColor: "bg-rose-50",
  },
];

// شهور قسم Flexible
const flexibleMonths = [
  { month: "October", year: "2026" },
  { month: "November", year: "2026" },
  { month: "December", year: "2026" },
  { month: "January", year: "2027" },
  { month: "February", year: "2027" },
  { month: "March", year: "2027" },
];

export default function Navbar({
  onOpenAuth,
  viewMode,
  setViewMode,
  isAuthenticated,
  activeCategory = "all",
  setActiveCategory,
  onLogout,
}) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  const [activeSearchStep, setActiveSearchStep] = useState(null);
  const [destination, setDestination] = useState("");

  // حالات قسم الـ Date Popup
  const [dateTab, setDateTab] = useState("dates");
  const [flexDuration, setFlexDuration] = useState("week");
  const [selectedMonths, setSelectedMonths] = useState(["October 2026"]);

  // حالات اختيار التواريخ و Exact Date
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [checkInFlex, setCheckInFlex] = useState("Exact date");
  const [checkOutFlex, setCheckOutFlex] = useState("Exact date");
  const [activeFlexDropdown, setActiveFlexDropdown] = useState(null);

  // حالة العدادات للضيوف
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState("lang");

  // 🟢 مراجع (Refs) لكشف الضغط الخارجي
  const navRef = useRef(null);

  const totalGuests = guests.adults + guests.children + guests.infants + guests.pets;

  // 🟢 إغلاق القوائم عند النقر خارج الـ Navbar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveSearchStep(null);
        setIsMenuOpen(false);
        setActiveFlexDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

const handleCategorySelect = (category) => {
  if (setActiveCategory) {
    setActiveCategory(category);
  }
  if (setViewMode) {
    setViewMode('guest'); // 🟢 التبديل لوضع الزائر لرؤية قسم العقارات
  }
  navigate('/');
};
  const handleDaySelect = (day, monthName) => {
    const formatted = `${monthName.slice(0, 3)} ${day}`;
    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(formatted);
      setCheckOutDate(null);
    } else {
      setCheckOutDate(formatted);
      setActiveSearchStep("who");
    }
  };

  const renderDateText = () => {
    if (dateTab === "flexible") return "Anytime";
    if (checkInDate && checkOutDate) return `${checkInDate} – ${checkOutDate}`;
    if (checkInDate) return `${checkInDate} – Add date`;
    return t ? t("add_dates") : "Add dates";
  };

  const updateGuest = (type, operation) => {
    setGuests((prev) => {
      const currentVal = prev[type];
      const newVal = operation === "add" ? currentVal + 1 : Math.max(0, currentVal - 1);

      let updatedAdults = prev.adults;
      if (operation === "add" && type !== "adults" && prev.adults === 0) {
        updatedAdults = 1;
      }

      return {
        ...prev,
        adults: updatedAdults,
        [type]: newVal,
      };
    });
  };

  const toggleMonthSelection = (monthYearStr) => {
    if (selectedMonths.includes(monthYearStr)) {
      setSelectedMonths(selectedMonths.filter((m) => m !== monthYearStr));
    } else {
      setSelectedMonths([...selectedMonths, monthYearStr]);
    }
  };

  const changeLanguage = (langCode) => {
    if (i18n && i18n.changeLanguage) {
      i18n.changeLanguage(langCode);
    }
    document.documentElement.dir = langCode === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = langCode;
    setIsLangModalOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCompactClick = (step) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveSearchStep(step);
  };

  const toggleSearchStep = (step) => {
    setActiveSearchStep((prevStep) => (prevStep === step ? null : step));
  };

  const handleNavigate = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  return (
    <header ref={navRef} className={`navbar-container ${isScrolled ? "is-scrolled" : ""}`}>
      {/* Top Header Row */}
      <div className="top-nav">
        <Link to="/" className="logo cursor-pointer flex items-center gap-2">
          <FaAirbnb size={32} color="#ff385c" />
          <span className="logo-text">airbnb</span>
        </Link>

        {/* Normal Nav Links */}
        {!isScrolled && (
          <div className="nav-links">
            <div
              className={`nav-item ${activeCategory === "all" ? "active" : ""}`}
              onClick={() => handleCategorySelect("all")}
            >
              <img
                src="https://em-content.zobj.net/source/apple/354/globe-showing-europe-africa_1f30d.png"
                alt="All"
                className="tab-icon-3d"
              />
              <span>{t ? t("all") : "All"}</span>
            </div>

            <div
              className={`nav-item ${activeCategory === "homes" ? "active" : ""}`}
              onClick={() => handleCategorySelect("homes")}
            >
              <img
                src="https://em-content.zobj.net/source/apple/354/house-with-garden_1f3e1.png"
                alt="Homes"
                className="tab-icon-3d"
              />
              <span>{t ? t("homes") : "Homes"}</span>
            </div>

            <div
              className={`nav-item ${activeCategory === "experiences" ? "active" : ""}`}
              onClick={() => handleCategorySelect("experiences")}
            >
              <img
                src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f388.png"
                alt="Experiences"
                className="tab-icon-3d"
              />
              <span>{t ? t("experiences") : "Experiences"}</span>
            </div>

            <div
              className={`nav-item ${activeCategory === "services" ? "active" : ""}`}
              onClick={() => handleCategorySelect("services")}
            >
              <img
                src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f6ce.png"
                alt="Services"
                className="tab-icon-3d"
              />
              <span>{t ? t("services") : "Services"}</span>
            </div>
          </div>
        )}

        {/* Compact Search Bar */}
        {isScrolled && (
          <div className="compact-search-bar">
            <div className="compact-option" onClick={() => handleCompactClick("where")}>
              <img
                src="https://em-content.zobj.net/source/apple/354/house-with-garden_1f3e1.png"
                alt="icon"
                className="compact-icon"
              />
              <span>{destination || (t ? t("anywhere") : "Anywhere")}</span>
            </div>

            <span className="compact-divider">|</span>

            <div className="compact-option" onClick={() => handleCompactClick("when")}>
              <span>{renderDateText()}</span>
            </div>

            <span className="compact-divider">|</span>

            <div className="compact-option text-light" onClick={() => handleCompactClick("who")}>
              <span>{totalGuests > 0 ? `${totalGuests} guests` : (t ? t("add_guests") : "Add guests")}</span>
            </div>

            <div className="compact-search-btn" onClick={() => handleCompactClick("where")}>
              <TbSearch size={12} color="#ffffff" />
            </div>
          </div>
        )}

        {/* Nav Right */}
        <div className="nav-right">
          <span
            className="host cursor-pointer font-medium text-sm text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-full transition"
            onClick={() => setViewMode && setViewMode(viewMode === "host" ? "guest" : "host")}
          >
            {viewMode === "host" ? "Switch to guest" : "Switch to hosting"}
          </span>

          <div className="menu-container relative">
            <button
              className="profile-btn flex items-center gap-2 border border-gray-300 rounded-full p-1 pl-3 hover:shadow-md transition cursor-pointer"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-semibold flex items-center justify-center text-sm">
                N
              </div>
              <TbMenu2 size={18} color="#555" />
            </button>

            {/* Profile Dropdown Menu */}
            {isMenuOpen && (
              <div className="profile-dropdown" onClick={() => setIsMenuOpen(false)}>
                {!isAuthenticated && (
                  <>
                    <div
                      className="dropdown-item bold-item"
                      onClick={() => {
                        setIsMenuOpen(false);
                        if (onOpenAuth) onOpenAuth();
                      }}
                    >
                      Log in / Sign up
                    </div>
                    <div className="dropdown-divider"></div>
                  </>
                )}

                {/* Section 1 */}
                <div className="dropdown-item bold-item" onClick={() => handleNavigate('/wishlists')}>
                  <TbHeart size={18} />
                  <span>Wishlists</span>
                </div>
                <div className="dropdown-item bold-item" onClick={() => handleNavigate('/trips')}>
                  <FaAirbnb size={18} color="#222222" />
                  <span>Trips</span>
                </div>
                <div className="dropdown-item bold-item" onClick={() => handleNavigate('/dashboard')}>
                  <TbUser size={18} />
                  <span>Profile</span>
                </div>

                <div className="dropdown-divider"></div>

                {/* Section 2 */}
                <div className="dropdown-item" onClick={() => handleNavigate('/dashboard')}>
                  <TbBell size={18} />
                  <span>Notifications</span>
                </div>
                <div className="dropdown-item" onClick={() => handleNavigate('/profile')}>
                  <TbSettings size={18} />
                  <span>Account settings</span>
                </div>
                <div className="dropdown-item" onClick={() => setIsLangModalOpen(true)}>
                  <TbWorld size={18} />
                  <span>Languages & currency</span>
                </div>
                <div className="dropdown-item">
                  <TbQuestionMark size={18} />
                  <span>Help Center</span>
                </div>

                <div className="dropdown-divider"></div>

                {/* Section 3: Become a Host Card */}
                <div className="dropdown-host-card" onClick={() => handleNavigate('/host')}>
                  <div className="host-card-text">
                    <p className="host-card-title">Become a host</p>
                    <p className="host-card-sub">It's easy to start hosting and earn extra income.</p>
                  </div>
                  <img
                    src="https://a0.muscache.com/pictures/54853040-e421-4384-90f7-5b615c48c4cc.jpg"
                    alt="Host"
                    className="host-card-img"
                  />
                </div>

                <div className="dropdown-divider"></div>

                {/* Section 4 */}
                <div className="dropdown-item plain-text" onClick={() => handleNavigate('/host')}>Refer a Host</div>
                <div className="dropdown-item plain-text">Find a co-host</div>
                <div className="dropdown-item plain-text">Gift cards</div>

                <div className="dropdown-divider"></div>

                {/* Section 5 */}
                {isAuthenticated && (
                  <div
                    className="dropdown-item plain-text text-red-600 font-semibold"
                    onClick={() => {
                      if (onLogout) onLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    Log out
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Language Modal */}
      {isLangModalOpen && (
        <div className="modal-overlay" onClick={() => setIsLangModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setIsLangModalOpen(false)}>
              <TbX size={20} />
            </button>

            <div className="modal-tabs">
              <button
                className={modalTab === "lang" ? "active" : ""}
                onClick={() => setModalTab("lang")}
              >
                Language & region
              </button>
              <button
                className={modalTab === "curr" ? "active" : ""}
                onClick={() => setModalTab("curr")}
              >
                Currency
              </button>
            </div>

            <p className="section-heading">Suggested languages</p>
            <div className="languages-grid">
              <div
                className={`lang-card ${i18n?.language === "en" ? "active" : ""}`}
                onClick={() => changeLanguage("en")}
              >
                <p className="lang-name">English</p>
                <p className="lang-region">United States</p>
              </div>

              <div
                className={`lang-card ${i18n?.language === "ar" ? "active" : ""}`}
                onClick={() => changeLanguage("ar")}
              >
                <p className="lang-name">العربية</p>
                <p className="lang-region">العالم</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Expanded Search Bar */}
      {!isScrolled && (
        <div className="search-bar-wrapper">
          <div className="search-bar">
            {/* WHERE */}
            <div
              className={`search-section ${activeSearchStep === "where" ? "section-active" : ""}`}
              onClick={() => toggleSearchStep("where")}
            >
              <label className="search-label">Where</label>
              <input
                type="text"
                placeholder="Search destinations"
                className="search-input"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />

              {activeSearchStep === "where" && (
                <div className="where-popup" onClick={(e) => e.stopPropagation()}>
                  <p className="where-popup-title">Suggested destinations</p>
                  <div className="where-destinations-list">
                    {suggestedDestinations.map((item, index) => (
                      <div
                        key={index}
                        className="where-dest-item"
                        onClick={() => {
                          setDestination(item.title);
                          setActiveSearchStep("when");
                        }}
                      >
                        <div className={`where-icon-box ${item.bgColor}`}>
                          {item.icon}
                        </div>
                        <div className="where-dest-info">
                          <p className="where-dest-title">{item.title}</p>
                          <p className="where-dest-subtitle">{item.subtitle}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="search-divider"></div>

            {/* WHEN */}
            <div
              className={`search-section ${activeSearchStep === "when" ? "section-active" : ""}`}
              onClick={() => toggleSearchStep("when")}
            >
              <label className="search-label">When</label>
              <span className="search-placeholder font-medium">
                {renderDateText()}
              </span>

              {activeSearchStep === "when" && (
                <div className="when-popup" onClick={(e) => e.stopPropagation()}>
                  <div className="when-tab-header">
                    <div className="when-tab-toggle">
                      <button
                        className={dateTab === "dates" ? "active" : ""}
                        onClick={() => setDateTab("dates")}
                      >
                        Dates
                      </button>
                      <button
                        className={dateTab === "flexible" ? "active" : ""}
                        onClick={() => setDateTab("flexible")}
                      >
                        Flexible
                      </button>
                    </div>
                  </div>

                  {dateTab === "dates" && (
                    <div className="calendar-view">
                      <div className="calendar-grid-container">
                        <div className="month-column">
                          <div className="month-header">
                            <button className="cal-nav-btn"><TbChevronLeft size={18} /></button>
                            <span className="month-title">October 2026</span>
                            <span></span>
                          </div>
                          <div className="weekdays-grid">
                            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                          </div>
                          <div className="days-grid">
                            <span></span><span></span><span></span><span></span>
                            {[...Array(31)].map((_, i) => {
                              const day = i + 1;
                              const isSelected = checkInDate === `Oct ${day}` || checkOutDate === `Oct ${day}`;
                              return (
                                <button
                                  key={i}
                                  onClick={() => handleDaySelect(day, "October 2026")}
                                  className={`day-btn ${isSelected ? "today-active bg-black text-white" : ""}`}
                                >
                                  {day}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="month-column">
                          <div className="month-header">
                            <span></span>
                            <span className="month-title">November 2026</span>
                            <button className="cal-nav-btn"><TbChevronRight size={18} /></button>
                          </div>
                          <div className="weekdays-grid">
                            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                          </div>
                          <div className="days-grid">
                            {[...Array(30)].map((_, i) => {
                              const day = i + 1;
                              const isSelected = checkInDate === `Nov ${day}` || checkOutDate === `Nov ${day}`;
                              return (
                                <button
                                  key={i}
                                  onClick={() => handleDaySelect(day, "November 2026")}
                                  className={`day-btn bold-day ${isSelected ? "today-active bg-black text-white" : ""}`}
                                >
                                  {day}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Exact date */}
                      <div className="date-selectors-row relative">
                        {/* Check-in Selector */}
                        <div
                          className="selector-box relative cursor-pointer"
                          onClick={() => setActiveFlexDropdown(activeFlexDropdown === 'checkin' ? null : 'checkin')}
                        >
                          <div className="selector-label-group">
                            <span className="selector-sub">Check-in</span>
                            <span className="selector-val font-semibold">{checkInDate ? `${checkInDate} (${checkInFlex})` : checkInFlex}</span>
                          </div>
                          <TbChevronDown size={18} />

                          {activeFlexDropdown === 'checkin' && (
                            <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden text-left">
                              {['Exact date', '± 1 day', '± 2 days', '± 3 days', '± 7 days'].map((option) => (
                                <div
                                  key={option}
                                  className="px-4 py-2.5 hover:bg-gray-100 text-sm font-medium cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCheckInFlex(option);
                                    setActiveFlexDropdown(null);
                                  }}
                                >
                                  {option}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Checkout Selector */}
                        <div
                          className="selector-box relative cursor-pointer"
                          onClick={() => setActiveFlexDropdown(activeFlexDropdown === 'checkout' ? null : 'checkout')}
                        >
                          <div className="selector-label-group">
                            <span className="selector-sub">Checkout</span>
                            <span className="selector-val font-semibold">{checkOutDate ? `${checkOutDate} (${checkOutFlex})` : checkOutFlex}</span>
                          </div>
                          <TbChevronDown size={18} />

                          {activeFlexDropdown === 'checkout' && (
                            <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden text-left">
                              {['Exact date', '± 1 day', '± 2 days', '± 3 days', '± 7 days'].map((option) => (
                                <div
                                  key={option}
                                  className="px-4 py-2.5 hover:bg-gray-100 text-sm font-medium cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCheckOutFlex(option);
                                    setActiveFlexDropdown(null);
                                  }}
                                >
                                  {option}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {dateTab === "flexible" && (
                    <div className="flexible-view">
                      <h4 className="flex-section-title">How long would you like to stay?</h4>
                      <div className="duration-pills">
                        <button
                          className={`pill-btn ${flexDuration === "weekend" ? "active" : ""}`}
                          onClick={() => setFlexDuration("weekend")}
                        >
                          Weekend
                        </button>
                        <button
                          className={`pill-btn ${flexDuration === "week" ? "active" : ""}`}
                          onClick={() => setFlexDuration("week")}
                        >
                          Week
                        </button>
                        <button
                          className={`pill-btn ${flexDuration === "month" ? "active" : ""}`}
                          onClick={() => setFlexDuration("month")}
                        >
                          Month
                        </button>
                      </div>

                      <h4 className="flex-section-title mt-6">Go anytime</h4>
                      <div className="months-cards-wrapper">
                        <div className="months-cards-grid">
                          {flexibleMonths.map((item, idx) => {
                            const monthKey = `${item.month} ${item.year}`;
                            const isSelected = selectedMonths.includes(monthKey);
                            return (
                              <div
                                key={idx}
                                className={`month-card ${isSelected ? "selected" : ""}`}
                                onClick={() => toggleMonthSelection(monthKey)}
                              >
                                <TbCalendar size={32} className="month-card-icon" />
                                <span className="month-card-name">{item.month}</span>
                                <span className="month-card-year">{item.year}</span>
                              </div>
                            );
                          })}
                        </div>
                        <button className="months-scroll-next">
                          <TbChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="search-divider"></div>

            {/* WHO */}
            <div
              className={`search-section ${activeSearchStep === "who" ? "section-active" : ""}`}
              onClick={() => toggleSearchStep("who")}
            >
              <label className="search-label">Who</label>
              <span className="search-placeholder">
                {totalGuests > 0 ? `${totalGuests} guests` : "Add guests"}
              </span>

              {activeSearchStep === "who" && (
                <div className="who-popup" onClick={(e) => e.stopPropagation()}>
                  <div className="who-row">
                    <div className="who-info">
                      <span className="who-title">Adults</span>
                      <span className="who-sub">Ages 13 or above</span>
                    </div>
                    <div className="who-counter">
                      <button
                        className={`counter-btn ${guests.adults === 0 ? "disabled" : ""}`}
                        onClick={() => updateGuest("adults", "sub")}
                        disabled={guests.adults === 0}
                      >
                        <TbMinus size={14} />
                      </button>
                      <span className="counter-val">{guests.adults}</span>
                      <button
                        className="counter-btn"
                        onClick={() => updateGuest("adults", "add")}
                      >
                        <TbPlus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="who-row">
                    <div className="who-info">
                      <span className="who-title">Children</span>
                      <span className="who-sub">Ages 2–12</span>
                    </div>
                    <div className="who-counter">
                      <button
                        className={`counter-btn ${guests.children === 0 ? "disabled" : ""}`}
                        onClick={() => updateGuest("children", "sub")}
                        disabled={guests.children === 0}
                      >
                        <TbMinus size={14} />
                      </button>
                      <span className="counter-val">{guests.children}</span>
                      <button
                        className="counter-btn"
                        onClick={() => updateGuest("children", "add")}
                      >
                        <TbPlus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="who-row">
                    <div className="who-info">
                      <span className="who-title">Infants</span>
                      <span className="who-sub">Under 2</span>
                    </div>
                    <div className="who-counter">
                      <button
                        className={`counter-btn ${guests.infants === 0 ? "disabled" : ""}`}
                        onClick={() => updateGuest("infants", "sub")}
                        disabled={guests.infants === 0}
                      >
                        <TbMinus size={14} />
                      </button>
                      <span className="counter-val">{guests.infants}</span>
                      <button
                        className="counter-btn"
                        onClick={() => updateGuest("infants", "add")}
                      >
                        <TbPlus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="who-row">
                    <div className="who-info">
                      <span className="who-title">Pets</span>
                      <a href="#service-animal" className="who-sub underline cursor-pointer">
                        Bringing a service animal?
                      </a>
                    </div>
                    <div className="who-counter">
                      <button
                        className={`counter-btn ${guests.pets === 0 ? "disabled" : ""}`}
                        onClick={() => updateGuest("pets", "sub")}
                        disabled={guests.pets === 0}
                      >
                        <TbMinus size={14} />
                      </button>
                      <span className="counter-val">{guests.pets}</span>
                      <button
                        className="counter-btn"
                        onClick={() => updateGuest("pets", "add")}
                      >
                        <TbPlus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              className={`search-button ${activeSearchStep ? "expanded" : ""}`}
              onClick={() => setActiveSearchStep(null)}
            >
              <TbSearch size={18} color="#ffffff" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
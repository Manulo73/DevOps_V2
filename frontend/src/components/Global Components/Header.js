"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import { logout } from "@/lib/api/login";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);
  const [logoutOpen, setLogoutOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
        setLogoutOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const unreadCount = notifications.filter(n => n.is_read === false).length;
  const handleSignOut = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <header className={styles.header}>
      <div className={styles.left_container}>
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={20}
          height={20}
          className={styles.logo}
        />
        <h3>Incidentes 73 | Sistema de Gestión de Incidentes de TI</h3>
      </div>

      <div className={styles.right_container} ref={dropdownRef}>

        {/* Bell icon */}
        <div className={styles.notification_bell}>
          <svg width="20" height="25" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 29.25C13.65 29.25 15 27.9 15 26.25H9C9 27.9 10.335 29.25 12 29.25ZM21 20.25V12.75C21 8.145 18.54 4.29 14.25 3.27V2.25C14.25 1.005 13.245 0 12 0C10.755 0 9.75 1.005 9.75 2.25V3.27C5.445 4.29 3 8.13 3 12.75V20.25L0 23.25V24.75H24V23.25L21 20.25Z" fill="white"/>
          </svg>

          {/* Unread count */}
          {unreadCount > 0 && (
            <span className={styles.badge}>{unreadCount}</span>
          )}
        </div>

        {/* Notification dropdown */}
        {open && (
          <div className={styles.notifications_dropdown}>
            <h4>Notificaciones</h4>

            {notifications.length === 0 && (
              <p className={styles.empty}>Sin notificaciones</p>
            )}

            {notifications.map(n => (
              <div key={n.notification_id} className={styles.notification_item}>
                <strong>{n.title}</strong>
                <p>{n.message}</p>
                {n.link && <a href={n.link}>Ver más</a>}
              </div>
            ))}
          </div>
        )}

        <div className={styles.profile_wrapper}>
          <Image
            src="/images/user.svg"
            alt="Profile"
            width={30}
            height={30}
            className={styles.profile}
            onClick={() => setLogoutOpen(prev => !prev)}
          />

          {logoutOpen && (
            <div className={styles.dropdown}>
              <button onClick={handleSignOut}>Cerrar sesión</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
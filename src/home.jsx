import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesheets/home.css';
import { motion, AnimatePresence } from 'framer-motion'; 

function Home() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [notifications, setNotifications] = useState([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [trendingTags, setTrendingTags] = useState(['photography', 'travel', 'food', 'art', 'nature']);
    const [showUserMenu, setShowUserMenu] = useState(false);
    
    // Mock data for suggestions (in a real app, this would come from an API)
    const [suggestions] = useState([
        {
            id: 1,
            name: "Sai Harish",
            username: "@saiharish",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            followers: 1234,
            following: 567,
            posts: 42,
            bio: "Photographer | Traveler | Coffee Enthusiast"
        },
        {
            id: 2,
            name: "Sakthi",
            username: "@sakthi_creates",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            followers: 2345,
            following: 789,
            posts: 65,
            bio: "Digital Artist | UI Designer"
        },
        {
            id: 3,
            name: "Samyukthaa",
            username: "@sam_yuki",
            image: "https://randomuser.me/api/portraits/women/66.jpg",
            followers: 3456,
            following: 890,
            posts: 89,
            bio: "Travel Blogger | Food Lover"
        }
    ]);
    
    const [activityItems, setActivityItems] = useState([
        {
            id: 1,
            user: "Sakthi",
            username: "@sakthi_creates",
            action: "liked your post",
            time: "2 hours ago",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            content: {
                type: "image",
                preview: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=500&auto=format"
            },
            liked: false
        },
        {
            id: 2,
            user: "Samyukthaa",
            username: "@sam_yuki",
            action: "started following you",
            time: "5 hours ago",
            image: "https://randomuser.me/api/portraits/women/66.jpg",
            liked: false
        },
        {
            id: 3,
            user: "Sai Harish",
            username: "@saiharish",
            action: "commented on your photo",
            comment: "This is absolutely stunning! What camera did you use?",
            time: "Yesterday",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            content: {
                type: "image",
                preview: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=500&auto=format"
            },
            liked: false
        }
    ]);
    
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        // Add search functionality here
        console.log('Searching:', e.target.value);
    };

    const handleProfileClick = () => {
        setShowUserMenu(!showUserMenu);
    };

    const navigateToProfile = () => {
        navigate("/profile");
    };

    const handleInboxClick = () => {
        navigate("/inbox");
    };

    const handleTagClick = (tag) => {
        setSearchTerm(tag);
        addNotification(`Browsing #${tag} posts`);
    };

    const handleViewAll = () => {
        addNotification("Loading all activity...");
    };

    const handleSeeAllSuggestions = () => {
        addNotification("Loading more suggestions...");
    };

    const addNotification = (message) => {
        const newNotification = { 
            id: Date.now(), 
            message,
            read: false
        };
        
        setNotifications(prev => [newNotification, ...prev]);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
        }, 5000);
    };

    const closeNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const handleLikeActivity = (id) => {
        setActivityItems(prev => prev.map(item => 
            item.id === id ? { ...item, liked: !item.liked } : item
        ));
        
        const activity = activityItems.find(item => item.id === id);
        if (activity) {
            const action = activity.liked ? "unliked" : "liked";
            addNotification(`You ${action} ${activity.user}'s activity`);
        }
    };

    const handleReplyActivity = (id) => {
        const activity = activityItems.find(item => item.id === id);
        if (activity) {
            addNotification(`Replying to ${activity.user}...`);
        }
    };
    
    // Mock user data (in a real app, this would come from auth context or redux)
    const user = {
        name: "John Doe",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    };

    // Handle click outside user menu
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (showUserMenu && !e.target.closest('.user-menu')) {
                setShowUserMenu(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [showUserMenu]);

    return (
        <div className="home-page">
            {/* Background Elements */}
            <div className="grid-background"></div>
            <div className="gradient-blur top-left"></div>
            <div className="gradient-blur bottom-right"></div>
            
            <header className="app-header">
                <div className="header-content">
                    <div className="logo-container">
                        <h1 className="app-logo">socialApp</h1>
                    </div>
                    
                    <div className={`search-container ${isSearchFocused ? 'focused' : ''}`}>
                        <input 
                            type="text" 
                            className="search-input"
                            placeholder="Search friends, posts, tags..."
                            value={searchTerm}
                            onChange={handleSearch}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                        />
                        <span className="search-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </span>
                        <div className="search-border"></div>
                        <div className="search-glow"></div>
                        
                        {isSearchFocused && (
                            <motion.div 
                                className="search-dropdown"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="search-section">
                                    <h4>Quick Filters</h4>
                                    <div className="search-tags">
                                        {trendingTags.map(tag => (
                                            <button 
                                                key={tag} 
                                                className="tag-button"
                                                onClick={() => handleTagClick(tag)}
                                            >
                                                #{tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                {searchTerm && (
                                    <div className="search-section">
                                        <h4>Suggested Results</h4>
                                        <div className="search-results">
                                            {suggestions.filter(s => 
                                                s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                                s.username.toLowerCase().includes(searchTerm.toLowerCase())
                                            ).map(profile => (
                                                <div 
                                                    key={profile.id} 
                                                    className="search-result-item"
                                                    onClick={() => {
                                                        addNotification(`Viewing ${profile.name}'s profile`);
                                                        setIsSearchFocused(false);
                                                    }}
                                                >
                                                    <img src={profile.image} alt={profile.name} className="result-avatar" />
                                                    <div className="result-info">
                                                        <h5>{profile.name}</h5>
                                                        <p>{profile.username}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </div>
                    
                    <div className="header-actions">
                        <button 
                            className="icon-button notification-button"
                            onClick={handleInboxClick}
                            aria-label="Messages"
                        >
                            <span className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                            </span>
                            {notifications.length > 0 && (
                                <span className="notification-badge">{notifications.length}</span>
                            )}
                        </button>
                        
                        <div className="user-menu" onClick={handleProfileClick}>
                            <img 
                                src={user.avatar} 
                                alt="Profile" 
                                className="avatar"
                            />
                            <div className="user-menu-dropdown">
                                <span className="user-name">{user.name}</span>
                                <span className="dropdown-arrow">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </span>
                            </div>
                            
                            {showUserMenu && (
                                <motion.div 
                                    className="user-dropdown"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        position: 'absolute',
                                        top: '40px',
                                        right: '0',
                                        background: 'white',
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                        width: '200px',
                                        zIndex: 1000
                                    }}
                                >
                                    <div 
                                        style={{padding: '12px'}}
                                        onClick={navigateToProfile}
                                    >
                                        View Profile
                                    </div>
                                    <div 
                                        style={{padding: '12px'}}
                                        onClick={() => addNotification("Settings page coming soon")}
                                    >
                                        Settings
                                    </div>
                                    <div 
                                        style={{padding: '12px', borderTop: '1px solid #eee'}}
                                        onClick={() => addNotification("Logged out successfully")}
                                    >
                                        Logout
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            
            <main className="home-content">
                <section className="welcome-section">
                    <motion.h2 
                        className="welcome-heading"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Welcome back, {user.name.split(' ')[0]}!
                    </motion.h2>
                    <motion.p 
                        className="welcome-subtext"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Here's what's happening in your network
                    </motion.p>
                </section>
                
                <div className="content-layout">
                    <div className="content-main">
                        <section className="activity-section">
                            <div className="section-header">
                                <h3>Recent Activity</h3>
                                <button className="text-button" onClick={handleViewAll}>View all</button>
                            </div>
                            
                            <div className="activity-feed">
                                {activityItems.map((item, index) => (
                                    <motion.div 
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                    >
                                        <ActivityItem 
                                            item={item} 
                                            onLike={handleLikeActivity}
                                            onReply={handleReplyActivity}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    </div>
                    
                    <div className="content-sidebar">
                        <section className="suggestions-section">
                            <div className="section-header">
                                <h3>Suggested for you</h3>
                                <button className="text-button" onClick={handleSeeAllSuggestions}>See all</button>
                            </div>
                            
                            <div className="suggestions-container">
                                {suggestions.map((profile, index) => (
                                    <motion.div 
                                        key={profile.id}
                                        className="profile-card"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                    >
                                        <SuggestionProfile 
                                            profile={profile}
                                            onNotification={addNotification}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                        
                        <section className="trending-section">
                            <div className="section-header">
                                <h3>Trending Topics</h3>
                            </div>
                            
                            <div className="trending-tags">
                                {trendingTags.map((tag, index) => (
                                    <motion.button 
                                        key={tag} 
                                        className="trending-tag"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        onClick={() => handleTagClick(tag)}
                                    >
                                        #{tag}
                                        <span className="tag-count">{Math.floor(Math.random() * 900) + 100}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            
            {/* Notifications */}
            <div className="notifications-container">
                <AnimatePresence>
                    {notifications.map(notification => (
                        <motion.div 
                            key={notification.id} 
                            className="notification-toast"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        >
                            <span className="notification-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                                </svg>
                            </span>
                            <p>{notification.message}</p>
                            <button 
                                className="notification-close"
                                onClick={() => closeNotification(notification.id)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

function SuggestionProfile({ profile, onNotification }) {
    const [isFollowing, setIsFollowing] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
        onNotification(`${isFollowing ? 'Unfollowed' : 'You now follow'} ${profile.name}`);
    };

    const handleMessage = () => {
        onNotification(`Opening chat with ${profile.name}`);
    };

    return (
        <div 
            className="suggestion-profile"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="profile-header">
                <div className="profile-image-container">
                    <img 
                        src={profile.image} 
                        alt={`${profile.name}'s profile`}
                        className="profile-image" 
                    />
                    {isHovered && (
                        <motion.div 
                            className="profile-stats"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="stat">
                                <span className="stat-value">{profile.posts}</span>
                                <span className="stat-label">Posts</span>
                            </div>
                            <div className="stat">
                                <span className="stat-value">{profile.followers}</span>
                                <span className="stat-label">Followers</span>
                            </div>
                            <div className="stat">
                                <span className="stat-value">{profile.following}</span>
                                <span className="stat-label">Following</span>
                            </div>
                        </motion.div>
                    )}
                </div>
                <div className="profile-info">
                    <h4 className="profile-name">{profile.name}</h4>
                    <p className="profile-username">{profile.username}</p>
                    <p className="profile-bio">{profile.bio}</p>
                </div>
            </div>
            <div className="profile-actions">
                <button 
                    className={`follow-button ${isFollowing ? 'following' : ''}`}
                    onClick={handleFollow}
                >
                    {isFollowing ? (
                        <>
                            <span className="button-text">Following</span>
                            <span className="button-hover-text">Unfollow</span>
                        </>
                    ) : 'Follow'}
                </button>
                <button className="message-button" onClick={handleMessage}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
}

function ActivityItem({ item, onLike, onReply }) {
    return (
        <div className="activity-item">
            <div className="activity-user">
                <img src={item.image} alt={item.user} className="activity-avatar" />
                <div className="activity-details">
                    <div className="activity-text">
                        <span className="user-name">{item.user}</span> {item.action}
                        {item.comment && (
                            <p className="activity-comment">"{item.comment}"</p>
                        )}
                    </div>
                    <span className="activity-time">{item.time}</span>
                </div>
            </div>
            
            {item.content && (
                <div className="activity-content">
                    <img 
                        src={item.content.preview} 
                        alt="Activity content" 
                        className="activity-preview"
                    />
                </div>
            )}
            
            <div className="activity-actions">
                <button 
                    className={`activity-action-button ${item.liked ? 'active' : ''}`} 
                    onClick={() => onLike(item.id)}
                    style={{ color: item.liked ? '#ff3366' : '' }}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill={item.liked ? "currentColor" : "none"} 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span>Like</span>
                </button>
                <button 
                    className="activity-action-button"
                    onClick={() => onReply(item.id)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    <span>Reply</span>
                </button>
            </div>
        </div>
    );
}

export default Home;
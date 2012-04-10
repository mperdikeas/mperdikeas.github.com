/*jslint evil:true */
/**
 * Dynamic thread loader
 *
 * 
 *  * 
 * 
 * 
*/

// 
var DISQUS;
if (!DISQUS || typeof DISQUS == 'function') {
    throw "DISQUS object is not initialized";
}
// 

// json_data and default_json django template variables will close
// and re-open javascript comment tags

(function () {
    var jsonData, cookieMessages, session, key;

    /* */ jsonData = {"reactions": [], "reactions_limit": 10, "ordered_highlighted": [], "posts": {"209584856": {"edited": false, "author_is_moderator": false, "from_request_user": false, "up_voted": false, "can_edit": false, "ip": "", "last_modified_date": null, "dislikes": 0, "raw_message": "\u00a0This is awesome! Thank you!", "has_replies": false, "vote": false, "votable": true, "last_modified_by": null, "real_date": "2011-05-22_18:11:15", "date": "10 months ago", "message": "<p>\u00a0This is awesome! Thank you!</p>", "approved": true, "is_last_child": false, "author_is_founder": false, "can_reply": true, "likes": 0, "user_voted": null, "num_replies": 0, "down_voted": false, "is_first_child": false, "has_been_anonymized": false, "highlighted": false, "parent_post_id": null, "depth": 0, "points": 0, "user_key": "twitter-14425176", "author_is_creator": false, "email": "", "killed": false, "is_realtime": false}, "209584961": {"edited": false, "author_is_moderator": false, "from_request_user": false, "up_voted": false, "can_edit": false, "ip": "", "last_modified_date": null, "dislikes": 0, "raw_message": "\u00a0This is a great post! Thank you!", "has_replies": false, "vote": false, "votable": true, "last_modified_by": null, "real_date": "2011-05-22_18:11:38", "date": "10 months ago", "message": "<p>\u00a0This is a great post! Thank you!</p>", "approved": true, "is_last_child": false, "author_is_founder": false, "can_reply": true, "likes": 0, "user_voted": null, "num_replies": 0, "down_voted": false, "is_first_child": false, "has_been_anonymized": false, "highlighted": false, "parent_post_id": null, "depth": 0, "points": 0, "user_key": "twitter-14425176", "author_is_creator": false, "email": "", "killed": false, "is_realtime": false}, "340299890": {"edited": false, "author_is_moderator": false, "from_request_user": null, "up_voted": false, "can_edit": false, "ip": "", "last_modified_date": null, "dislikes": 0, "raw_message": "If you clone a repository twice (cloneA and cloneB)\nCreate a new branch in cloneA (call it test) and push it back to the remote repo\nRun 'git branch -a', then I see the branch 'test' as both local and remote\nHowever if I switch over to cloneB and run 'git branch -a', I will not see the new remote branch called 'test'.\nIf I run 'git ls-remote', the new branch called 'test' shows up in the list.\nI may be wrong, but I think that 'git branch -r' only shows remote branches that you happen to be tracking.", "has_replies": false, "vote": false, "votable": true, "last_modified_by": null, "real_date": "2011-10-20_20:00:29", "date": "5 months ago", "message": "<p>If you clone a repository twice (cloneA and cloneB)<br>Create a new branch in cloneA (call it test) and push it back to the remote repo<br>Run 'git branch -a', then I see the branch 'test' as both local and remote<br>However if I switch over to cloneB and run 'git branch -a', I will not see the new remote branch called 'test'.<br>If I run 'git ls-remote', the new branch called 'test' shows up in the list.<br>I may be wrong, but I think that 'git branch -r' only shows remote branches that you happen to be tracking.</p>", "approved": true, "is_last_child": false, "author_is_founder": false, "can_reply": true, "likes": 0, "user_voted": null, "num_replies": 0, "down_voted": false, "is_first_child": false, "has_been_anonymized": false, "highlighted": false, "parent_post_id": null, "depth": 0, "points": 0, "user_key": "b8a5e18721c4d9330bee0f314088c455", "author_is_creator": false, "email": "", "killed": false, "is_realtime": false}, "344004253": {"edited": false, "author_is_moderator": false, "from_request_user": false, "up_voted": false, "can_edit": false, "ip": "", "last_modified_date": null, "dislikes": 0, "raw_message": "Thanks Nick, this came in handy today. \u00a0Also for others, you can get the same information via gitk by pressing F2 (or File -> List References).", "has_replies": false, "vote": false, "votable": true, "last_modified_by": null, "real_date": "2011-10-25_14:30:21", "date": "5 months ago", "message": "<p>Thanks Nick, this came in handy today. \u00a0Also for others, you can get the same information via gitk by pressing F2 (or File -&gt; List References).</p>", "approved": true, "is_last_child": false, "author_is_founder": false, "can_reply": true, "likes": 0, "user_voted": null, "num_replies": 0, "down_voted": false, "is_first_child": false, "has_been_anonymized": false, "highlighted": false, "parent_post_id": null, "depth": 0, "points": 0, "user_key": "circuitfive", "author_is_creator": false, "email": "", "killed": false, "is_realtime": false}, "316865583": {"edited": false, "author_is_moderator": false, "from_request_user": false, "up_voted": false, "can_edit": false, "ip": "", "last_modified_date": "6 months ago", "dislikes": 0, "raw_message": "Thanks a million. This made my life much easier.", "has_replies": false, "vote": false, "votable": true, "last_modified_by": "author", "real_date": "2011-09-21_15:35:41", "date": "6 months ago", "message": "<p>Thanks a million. This made my life much easier.</p>", "approved": true, "is_last_child": false, "author_is_founder": false, "can_reply": true, "likes": 0, "user_voted": null, "num_replies": 0, "down_voted": false, "is_first_child": false, "has_been_anonymized": false, "highlighted": false, "parent_post_id": null, "depth": 0, "points": 0, "user_key": "twitter-15517683", "author_is_creator": false, "email": "", "killed": false, "is_realtime": false}}, "ordered_posts": [209584856, 209584961, 316865583, 340299890, 344004253], "realtime_enabled": false, "ready": true, "mediaembed": [], "has_more_reactions": false, "realtime_paused": true, "integration": {"receiver_url": null, "hide_user_votes": false, "reply_position": false, "disqus_logo": false}, "highlighted": {}, "reactions_start": 0, "media_url": "http://mediacdn.disqus.com/1334003189", "users": {"twitter-14425176": {"username": "twitter-14425176", "tumblr": "", "about": "", "display_name": "Irakli Nadareishvili", "url": "http://disqus.com/twitter-14425176/", "registered": true, "remote_id": "14425176", "linkedin": "", "blog": "http://twitter.com/inadarei", "remote_domain": 2, "points": 10, "facebook": "", "avatar": "http://mediacdn.disqus.com/uploads/users/466/2624/avatar92.jpg?1323593117", "delicious": "", "is_remote": true, "verified": false, "flickr": "", "twitter": "http://twitter.com/inadarei", "remote_domain_name": "Twitter"}, "circuitfive": {"username": "circuitfive", "tumblr": "", "about": "", "display_name": "circuitfive", "url": "http://disqus.com/circuitfive/", "registered": true, "remote_id": null, "linkedin": "", "blog": "", "remote_domain": "", "points": 19, "facebook": "", "avatar": "http://mediacdn.disqus.com/uploads/users/19/2094/avatar92.jpg?1333992289", "delicious": "", "is_remote": false, "verified": true, "flickr": "", "twitter": "http://twitter.com/circuitfive", "remote_domain_name": ""}, "twitter-15517683": {"username": "twitter-15517683", "tumblr": "", "about": "", "display_name": "Anmar", "url": "http://disqus.com/twitter-15517683/", "registered": true, "remote_id": "15517683", "linkedin": "", "blog": "http://twitter.com/situmam", "remote_domain": 2, "points": 2, "facebook": "", "avatar": "http://mediacdn.disqus.com/uploads/users/629/6927/avatar92.jpg?1318521436", "delicious": "", "is_remote": true, "verified": false, "flickr": "", "twitter": "http://twitter.com/situmam", "remote_domain_name": "Twitter"}, "b8a5e18721c4d9330bee0f314088c455": {"username": "Tim Warkentin", "tumblr": "", "about": "", "display_name": "Tim Warkentin", "url": "http://disqus.com/guest/b8a5e18721c4d9330bee0f314088c455/", "registered": false, "remote_id": null, "linkedin": "", "blog": "", "remote_domain": "", "points": null, "facebook": "", "avatar": "http://mediacdn.disqus.com/1334003189/images/noavatar92.png", "delicious": "", "is_remote": false, "verified": false, "flickr": "", "twitter": "", "remote_domain_name": ""}}, "user_unapproved": {}, "messagesx": {"count": 0, "unread": []}, "thread": {"voters_count": 2, "offset_posts": 0, "slug": "git_ready_list_remote_branches", "paginate": true, "num_pages": 2, "days_alive": 0, "moderate_none": false, "voters": {"Jipiii": {"url": "http://disqus.com/Jipiii/", "username": "Jipiii", "is_moderator": false, "avatar": "http://mediacdn.disqus.com/1334003189/images/noavatar32.png", "name": "Jipiii"}, "loneowais": {"url": "http://disqus.com/loneowais/", "username": "loneowais", "is_moderator": false, "avatar": "http://mediacdn.disqus.com/uploads/users/19/9149/avatar32.jpg?1313578582", "name": "Owais Lone"}}, "total_posts": 10, "realtime_paused": true, "queued": false, "pagination_type": "append", "user_vote": null, "likes": 21, "num_posts": 5, "closed": false, "per_page": 5, "id": 155799755, "killed": false, "moderate_all": false}, "forum": {"use_media": true, "avatar_size": 48, "apiKey": "Z6PeSglcyPGi30IAA3m70Ef1zGj2HKPftn4Y6ws3VKIg7s7SgzS2dD9vWbeXmnyM", "features": {}, "comment_max_words": 0, "mobile_theme_disabled": false, "is_early_adopter": false, "login_buttons_enabled": false, "streaming_realtime": false, "reply_position": false, "id": 74077, "default_avatar_url": "http://mediacdn.disqus.com/1334003189/images/noavatar92.png", "template": {"url": "http://mediacdn.disqus.com/1334003189/uploads/themes/7884a9652e94555c70f96b6be63be216/theme.js?252", "mobile": {"url": "http://mediacdn.disqus.com/1334003189/uploads/themes/mobile/theme.js", "css": "http://mediacdn.disqus.com/1334003189/uploads/themes/mobile/theme.css"}, "api": "1.1", "name": "Houdini", "css": "http://mediacdn.disqus.com/1334003189/uploads/themes/7884a9652e94555c70f96b6be63be216/theme.css?252"}, "max_depth": 0, "ranks_enabled": false, "lastUpdate": 1332304717, "linkbacks_enabled": false, "allow_anon_votes": true, "revert_new_login_flow": false, "stylesUrl": "http://mediacdn.disqus.com/uploads/styles/7/4077/git-ready.css", "show_avatar": true, "reactions_enabled": false, "disqus_auth_disabled": false, "name": "git ready: daily git tips", "language": "en", "mentions_enabled": true, "url": "git-ready", "allow_anon_post": true, "thread_votes_disabled": false, "hasCustomStyles": true, "moderate_all": false}, "settings": {"realtimeHost": "qq.disqus.com", "uploads_url": "http://media.disqus.com/uploads", "ssl_media_url": "https://securecdn.disqus.com/1334003189", "realtime_url": "http://rt.disqus.com/forums/realtime-cached.js", "facebook_app_id": "52254943976", "minify_js": true, "recaptcha_public_key": "6LdKMrwSAAAAAPPLVhQE9LPRW4LUSZb810_iaa8u", "read_only": false, "facebook_api_key": "52254943976", "juggler_url": "http://juggler.services.disqus.com", "realtimePort": "80", "debug": false, "disqus_url": "http://disqus.com", "media_url": "http://mediacdn.disqus.com/1334003189"}, "ranks": {}, "request": {"sort": "oldest", "is_authenticated": false, "user_type": "anon", "subscribe_on_post": 0, "missing_perm": null, "user_id": null, "remote_domain_name": "", "remote_domain": "", "is_verified": false, "profile_url": "", "username": "", "is_global_moderator": false, "sharing": {}, "timestamp": "2012-04-10_07:37:39", "is_moderator": false, "ordered_unapproved_posts": [], "unapproved_posts": {}, "forum": "git-ready", "is_initial_load": true, "display_username": "", "points": null, "has_email": false, "moderator_can_edit": false, "is_remote": false, "userkey": "", "page": 1}, "context": {"use_twitter_signin": false, "use_fb_connect": false, "show_reply": true, "active_switches": ["bespin", "community_icon", "embedapi", "google_auth", "mentions", "new_facebook_auth", "new_thread_create", "realtime_cached", "show_captcha_on_links", "ssl", "static_reply_frame", "static_styles", "statsd_created", "upload_media", "use_rs_paginator_60m"], "sigma_chance": 10, "use_google_signin": false, "switches": {"olark_admin_addons": true, "listactivity_replies": true, "es_index_threads": true, "use_master_for_api": true, "google_auth": true, "discovery_best_comment": true, "html_email": true, "moderate_ascending": true, "community_icon": true, "realtime_cached": true, "google_analytics": true, "olark_admin_packages": true, "static_styles": true, "firehose": true, "stats": true, "firehose_gnip_http": true, "discovery_preview_b_users": true, "transitional_sessions": true, "discovery_redirect_event": true, "show_captcha_on_links": true, "statsd_created": true, "bespin": true, "olark_support": true, "firehose_gnip": true, "firehose_pubsub": true, "olark_addons": true, "new_facebook_auth": true, "limit_get_posts_days_30d": true, "edits_to_spam": true, "juggler_thread_onReady": true, "discovery_network": true, "redis_sessions": true, "phoenix": true, "phoenix_reputation": true, "new_thread_create": true, "use_impermium": true, "upload_media": true, "vip_read_slave": true, "embedapi": true, "ssl": true, "es_index_posts_discovery": true, "usertransformer_reputation": true, "fingerprint": true, "send_to_impermium": true, "firehose_push": true, "theme_editor_disabled": true, "firehose_message_db_lookup": true, "listactivity_replies_30d": true, "realtime": true, "phoenix_optout": true, "statsd.timings": true, "train_impermium": true, "firehose_pubsub_throttle": true, "git_themes": true, "new_moderate": true, "use_rs_paginator_60m": true, "redis_threadcount": true, "mentions": true, "olark_install": true, "static_reply_frame": true}, "forum_facebook_key": "", "use_yahoo": false, "subscribed": false, "active_gargoyle_switches": ["discovery_best_comment", "discovery_network", "discovery_preview_b_users", "discovery_redirect_event", "edits_to_spam", "es_index_posts_discovery", "es_index_threads", "fingerprint", "firehose", "firehose_gnip", "firehose_gnip_http", "firehose_message_db_lookup", "firehose_pubsub", "firehose_pubsub_throttle", "firehose_push", "git_themes", "google_analytics", "html_email", "juggler_thread_onReady", "limit_get_posts_days_30d", "listactivity_replies", "listactivity_replies_30d", "moderate_ascending", "new_moderate", "olark_addons", "olark_admin_addons", "olark_admin_packages", "olark_install", "olark_support", "phoenix", "phoenix_optout", "phoenix_reputation", "realtime", "redis_sessions", "redis_threadcount", "send_to_impermium", "show_captcha_on_links", "stats", "statsd.timings", "theme_editor_disabled", "train_impermium", "transitional_sessions", "use_impermium", "use_master_for_api", "usertransformer_reputation", "vip_read_slave"], "realtime_speed": 15000, "use_openid": false}}; /* */
    /* __extrajson__ */
    cookieMessages = {"user_created": null, "post_has_profile": null, "post_twitter": null, "post_not_approved": null}; session = {"url": null, "name": null, "email": null};

    DISQUS.jsonData = jsonData;
    DISQUS.jsonData.cookie_messages = cookieMessages;
    DISQUS.jsonData.session = session;

    if (DISQUS.useSSL) {
        DISQUS.useSSL(DISQUS.jsonData.settings);
    }

    // The mappings below are for backwards compatibility--before we port all the code that
    // accesses jsonData.settings to DISQUS.settings

    var mappings = {
        debug:                'disqus.debug',
        minify_js:            'disqus.minified',
        read_only:            'disqus.readonly',
        recaptcha_public_key: 'disqus.recaptcha.key',
        facebook_app_id:      'disqus.facebook.appId',
        facebook_api_key:     'disqus.facebook.apiKey'
    };

    var urlMappings = {
        disqus_url:    'disqus.urls.main',
        media_url:     'disqus.urls.media',
        ssl_media_url: 'disqus.urls.sslMedia',
        realtime_url:  'disqus.urls.realtime',
        uploads_url:   'disqus.urls.uploads'
    };

    if (DISQUS.jsonData.context.switches.realtime_setting_change) {
        urlMappings.realtimeHost = 'realtime.host';
        urlMappings.realtimePort = 'realtime.port';
    }
    for (key in mappings) {
        if (mappings.hasOwnProperty(key)) {
            DISQUS.settings.set(mappings[key], DISQUS.jsonData.settings[key]);
        }
    }

    for (key in urlMappings) {
        if (urlMappings.hasOwnProperty(key)) {
            DISQUS.jsonData.settings[key] = DISQUS.settings.get(urlMappings[key]);
        }
    }
}());

DISQUS.jsonData.context.csrf_token = '21bc467119200cb06806902fa8e2f5b0';

DISQUS.jsonData.urls = {
    login: 'http://disqus.com/profile/login/',
    logout: 'http://disqus.com/logout/',
    upload_remove: 'http://git-ready.disqus.com/thread/git_ready_list_remote_branches/async_media_remove/',
    request_user_profile: 'http://disqus.com/AnonymousUser/',
    request_user_avatar: 'http://mediacdn.disqus.com/1334003189/images/noavatar92.png',
    verify_email: 'http://disqus.com/verify/',
    remote_settings: 'http://git-ready.disqus.com/_auth/embed/remote_settings/',
    edit_profile_window: 'http://disqus.com/embed/profile/edit/',
    embed_thread: 'http://git-ready.disqus.com/thread.js',
    embed_vote: 'http://git-ready.disqus.com/vote.js',
    embed_thread_vote: 'http://git-ready.disqus.com/thread_vote.js',
    embed_thread_share: 'http://git-ready.disqus.com/thread_share.js',
    embed_queueurl: 'http://git-ready.disqus.com/queueurl.js',
    embed_hidereaction: 'http://git-ready.disqus.com/hidereaction.js',
    embed_more_reactions: 'http://git-ready.disqus.com/more_reactions.js',
    embed_subscribe: 'http://git-ready.disqus.com/subscribe.js',
    embed_highlight: 'http://git-ready.disqus.com/highlight.js',
    embed_block: 'http://git-ready.disqus.com/block.js',
    update_moderate_all: 'http://git-ready.disqus.com/update_moderate_all.js',
    update_days_alive: 'http://git-ready.disqus.com/update_days_alive.js',
    show_user_votes: 'http://git-ready.disqus.com/show_user_votes.js',
    forum_view: 'http://git-ready.disqus.com/git_ready_list_remote_branches',
    cnn_saml_try: 'http://disqus.com/saml/cnn/try/',
    realtime: DISQUS.jsonData.settings.realtime_url,
    thread_view: 'http://git-ready.disqus.com/thread/git_ready_list_remote_branches/',
    twitter_connect: DISQUS.jsonData.settings.disqus_url + '/_ax/twitter/begin/',
    yahoo_connect: DISQUS.jsonData.settings.disqus_url + '/_ax/yahoo/begin/',
    openid_connect: DISQUS.jsonData.settings.disqus_url + '/_ax/openid/begin/',
    googleConnect: DISQUS.jsonData.settings.disqus_url + '/_ax/google/begin/',
    community: 'http://git-ready.disqus.com/community.html',
    admin: 'http://git-ready.disqus.com/admin/moderate/',
    moderate: 'http://git-ready.disqus.com/admin/moderate/',
    moderate_threads: 'http://git-ready.disqus.com/admin/moderate-threads/',
    settings: 'http://git-ready.disqus.com/admin/settings/',
    unmerged_profiles: 'http://disqus.com/embed/profile/unmerged_profiles/',
    juggler: DISQUS.jsonData.settings.juggler_url,

    channels: {
        def:      'http://disqus.com/default.html', /* default channel */
        auth:     'https://disqus.com/embed/login.html',
        tweetbox: 'http://disqus.com/forums/integrations/twitter/tweetbox.html?f=git-ready',
        edit:     'http://git-ready.disqus.com/embed/editcomment.html'
    }
};


// 
//     
DISQUS.jsonData.urls.channels.reply = 'http://mediacdn.disqus.com/1334003189/build/system/reply.html';
DISQUS.jsonData.urls.channels.upload = 'http://mediacdn.disqus.com/1334003189/build/system/upload.html';
DISQUS.jsonData.urls.channels.sso = 'http://mediacdn.disqus.com/1334003189/build/system/sso.html';
DISQUS.jsonData.urls.channels.facebook = 'http://mediacdn.disqus.com/1334003189/build/system/facebook.html';
//     
// 

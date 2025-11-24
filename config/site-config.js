/**
 * Site Configuration Entry Point
 * 
 * 此檔案負責整合所有頁面的設定。
 * 若要修改具體頁面內容，請前往 config/pages/ 目錄下的對應檔案：
 * - explore.js
 * - services.js
 * - about.js
 * - contact.js
 * - yuan.js
 */

const siteConfig = {
    explore: PageExplore,
    services: PageServices,
    team: PageAbout,
    contact: PageContact,
    yuan: PageYuan
};

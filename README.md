![White SPLT Logo](/public/splt-icon-white.svg#gh-dark-mode-only)
![Black SPLT Logo](/public/splt-icon-black.svg#gh-light-mode-only)

Open Source Bill Splitting Web Application 💸🤑👯

---

### Key Features
- Mobile first design, sleek and minimalistic
- Users can share link to the group with their friends
- No need logging in
- Automatically summarizing debts
- Users can specify their preferred payment methods (for the friends to send back the money)

### Tech Stacks
- NextJS (can be easily hosted on Vercel)
- Pocketbase (can be easily hosted on Pockethost.io)
- Mantine UI

### Getting Started
// TODO

### Development Setup

1. Clone this repo, and navigate to this
2. Install dependencies

    ```bash
    npm install
    ```
  
3. Run the front development server:

    ```bash
    npm run dev
    ```
4. Open new Terminal, and navigate to db folder 

    ```bash
    cd db
    ```
5. Download [Pocketbase](https://pocketbase.io/docs/) based on your system and copy `pocketbase` executable file to this db folder.
6. Start [Pocketbase](https://pocketbase.io/) (Backend + Database)

    ```bash
    ./pocketbase serve
    ```
7. Visit to [Admin UI](http://127.0.0.1:8090/_/) `http://127.0.0.1:8090/_/` and create admin account
8. Go to tab Settings -> [Import collections](http://127.0.0.1:8090/_/?#/settings/import-collections)
9. Press Load from JSON file and choose `pb_schema.json` file from this db folder
10. Enjoy!
    
### Production Deployment

// TODO

## TODOs
- [x] Add Editing Transaction
- [ ] Advanced Bill Spliting
- [ ] Loading Bar when pressing (as it slow with NextJS)
- [ ] Add non participant person in transaction view, show everyoneIsParticipant toggle
- [ ] Enable passcode checking
- [ ] Finishing `README.md` : Getting Started, Deploy, Banner + Screenshot, Center logo
- [ ] Code Refractoring, Cleaning
- [ ] Creating first release
- [x] Make contrast color on selecting participant when creating bill more clear
- [ ] Add button to show edit Preferred Payment Method when adding participant when creating Group
- [ ] IBAN Masking (when adding and viewing)
- [ ] Change Emoji choosing to [Emoji-Mart](https://github.com/missive/emoji-mart)
- [ ] Handle Error when no data is loaded
- [ ] Choose currency
- [ ] Summary page of how much per person

## Future Features
- [ ] Choosing who you are
- [ ] i18n
- [ ] Handle Preferrred Payment Method from other country
- [ ] Enable Authentication
- [ ] Bill Uploading: Store in S3, Extracting out information
- [ ] Bank name fetching from IBAN
- [ ] Dockerfile for easier deployment
- [ ] Email notification

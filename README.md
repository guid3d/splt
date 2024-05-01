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
5. Start [Pocketbase](https://pocketbase.io/) (Backend + Database)

    ```bash
    ./pocketbase serve
    ```

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

## Future Features
- [ ] Choosing who you are
- [ ] i18n
- [ ] Handle Preferrred Payment Method from other country
- [ ] Enable Authentication
- [ ] Bill Uploading: Store in S3, Extracting out information
- [ ] Bank fetching from IBAN

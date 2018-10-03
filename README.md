# iX - PWA Demo

## Setup

### Step 1: Install Angular CLI

On your favourite terminal, please run:

```
npm uninstall -g angular-cli @angular/cli
npm cache verify
npm install -g @angular/cli@6.2.4
```

Next, navigate to a folder of your choice and execute:

### Step 2: Clone repository and install packages
```
git clone https://github.com/thinktecture/ix-pwa-tutorial.git
cd ix-pwa-tutorial/api
npm install   # or yarn install (if installed)
cd ../client
npm install   # or yarn install (if installed)
```

If you prefer SSH, you can use this checkout URL: `git@github.com:thinktecture/ix-pwa-tutorial.git`

### Step 3: Run API and Application
To start the application run following commands. Please use a terminal for API and one for the application.

API
```
cd ix-pwa-tutorial
npm run start
```

Application
```
cd ix-pwa-tutorial
npm run start-prod
```

The application is available on http://localhost:4200/
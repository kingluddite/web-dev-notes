# SSL
## How to get SSL working on your local machine
* Trust the SSL certificate on your host machine
* The local dev environment uses self-signed certificate that needs to be trusted on the host machine.

## MacOS Instructions

1. Locate the `.cert` file
2. It's in the folder `config/ssl` of this repository
3. Open the "Keychain Access" application

`Finder` > `Applications` > `Utilities`

4. Unlock the access to the keychain by clicking on the big lock icon
5. Select the System keychains and drag and drop the `.cert` into the application window
6. Select "Always Trust" in the dialog box which appears
7. If the dialog doesn't appear, open the created certificate, click on the 'Trust' title, and set the 'When using this certificate' to 'Always Trust'
8. You should see a certificate with the name local.investors.com, under the "Certificates" category
9. You need to restart your browser to see this change take effect

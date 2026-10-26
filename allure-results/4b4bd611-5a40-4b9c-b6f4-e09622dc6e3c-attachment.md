# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: updateProfile.spec.js >> Update Profile Page
- Location: tests/updateProfile.spec.js:5:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('link', { name: 'Update Contact Info' })

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - link:
        - /url: admin.htm
        - img [ref=e4] [cursor=pointer]
      - link "ParaBank":
        - /url: index.htm
        - img "ParaBank" [ref=e5] [cursor=pointer]
      - paragraph [ref=e6]: Experience the difference
    - generic [ref=e7]:
      - list [ref=e8]:
        - listitem [ref=e9]: Solutions
        - listitem [ref=e10]:
          - link "About Us" [ref=e11] [cursor=pointer]:
            - /url: about.htm
        - listitem [ref=e12]:
          - link "Services" [ref=e13] [cursor=pointer]:
            - /url: services.htm
        - listitem [ref=e14]:
          - link "Products" [ref=e15] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/products.jsp
        - listitem [ref=e16]:
          - link "Locations" [ref=e17] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - listitem [ref=e18]:
          - link "Admin Page" [ref=e19] [cursor=pointer]:
            - /url: admin.htm
      - list [ref=e20]:
        - listitem [ref=e21]:
          - link "home" [ref=e22] [cursor=pointer]:
            - /url: index.htm
        - listitem [ref=e23]:
          - link "about" [ref=e24] [cursor=pointer]:
            - /url: about.htm
        - listitem [ref=e25]:
          - link "contact" [ref=e26] [cursor=pointer]:
            - /url: contact.htm
    - generic [ref=e27]:
      - generic [ref=e28]:
        - heading "Customer Login" [level=2] [ref=e29]
        - generic [ref=e30]:
          - generic [ref=e31]:
            - paragraph [ref=e32]: Username
            - textbox [active] [ref=e34]
            - paragraph [ref=e35]: Password
            - textbox [ref=e37]
            - button "Log In" [ref=e39] [cursor=pointer]
          - paragraph [ref=e40]:
            - link "Forgot login info?" [ref=e41] [cursor=pointer]:
              - /url: lookup.htm
          - paragraph [ref=e42]:
            - link "Register" [ref=e43] [cursor=pointer]:
              - /url: register.htm
      - generic [ref=e44]:
        - heading "Error!" [level=1] [ref=e45]
        - paragraph [ref=e46]: An internal error has occurred and has been logged.
  - generic [ref=e48]:
    - list [ref=e49]:
      - listitem [ref=e50]:
        - link "Home" [ref=e51] [cursor=pointer]:
          - /url: index.htm
        - text: "|"
      - listitem [ref=e52]:
        - link "About Us" [ref=e53] [cursor=pointer]:
          - /url: about.htm
        - text: "|"
      - listitem [ref=e54]:
        - link "Services" [ref=e55] [cursor=pointer]:
          - /url: services.htm
        - text: "|"
      - listitem [ref=e56]:
        - link "Products" [ref=e57] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/products.jsp
        - text: "|"
      - listitem [ref=e58]:
        - link "Locations" [ref=e59] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - text: "|"
      - listitem [ref=e60]:
        - link "Site Map" [ref=e61] [cursor=pointer]:
          - /url: sitemap.htm
        - text: "|"
      - listitem [ref=e62]:
        - link "Contact Us" [ref=e63] [cursor=pointer]:
          - /url: contact.htm
    - paragraph [ref=e64]: © Parasoft. All rights reserved.
    - list [ref=e65]:
      - listitem [ref=e66]: "Visit us at:"
      - listitem [ref=e67]:
        - link "www.parasoft.com" [ref=e68] [cursor=pointer]:
          - /url: http://www.parasoft.com/
```

# Test source

```ts
  1  | const { expect } = require('@playwright/test');
  2  | class UpdateProfile {
  3  |     constructor(page) {
  4  |         this.page = page;
  5  |         this.updateProfileLink = page.getByRole('link', { name: 'Update Contact Info' });
  6  |         this.pageTitile = page.locator('#updateProfileForm h1.title');
  7  |         this.phoneNumber = page.locator('[name="customer.phoneNumber"]');
  8  |         this.street = page.locator('[name="customer.address.street"]');
  9  |         this.city = page.locator('[name="customer.address.city"]');
  10 |         this.updateButton = page.getByRole('Button', { name: 'Update Profile' });
  11 |         this.ProfileUpdated= page.locator('#updateProfileResult h1.title');
  12 |     }
  13 |     async getUpdateProfilePage() {
> 14 |         await this.updateProfileLink.click();
     |                                      ^ Error: locator.click: Test timeout of 30000ms exceeded.
  15 |         await expect(this.pageTitile).toHaveText('Update Profile');
  16 |         await expect(this.phoneNumber).not.toHaveValue('');
  17 | 
  18 |     }
  19 |     async updateContactInfo(userData) {
  20 |         const updatedaddress = userData.address + 'y';
  21 |         const updatedCity = userData.updatedCity;
  22 |         await this.street.fill(updatedaddress);
  23 |         await this.city.clear();
  24 |         await this.city.pressSequentially(updatedCity);
  25 |     }
  26 |     async updateProfile(){
  27 |         await this.updateButton.click();
  28 |         await expect(this.ProfileUpdated).toHaveText('Profile Updated');
  29 |         await expect(this.ProfileUpdated).toBeVisible('Profile Updated')
  30 | 
  31 |     }
  32 | }
  33 | module.exports = UpdateProfile;
```
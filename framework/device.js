/******************************************************************************
 *
 * DEVICE
 * Author: Kerri Shotts
 *
 * This library includes functions that reflect the device and its current
 * state
 *
 ******************************************************************************/

/*jshint
         asi:true,
         bitwise:true,
         browser:true,
         camelcase:true,
         curly:true,
         eqeqeq:false,
         forin:true,
         noarg:true,
         noempty:true,
         plusplus:false,
         smarttabs:true,
         sub:true,
         trailing:false,
         undef:true,
         white:false,
         onevar:false 
 */
/*global device, PKUTIL */
if (PKUTIL) { if (PKUTIL.export) { PKUTIL.export ( "PKDEVICE" ); } }

var PKDEVICE = PKDEVICE ||
{
};
// create the namespace
PKDEVICE.version = { major: 0, minor: 3, rev: 100 };
PKDEVICE.platformOverride = false;
// change me for testing in a browser...
PKDEVICE.formFactorOverride = false;
// change me for testing in a browser

/**
 *
 * Returns the device platform, lowercased. If PKDEVICE.platformOverride is
 * other than "false", it is returned instead.
 *
 */
PKDEVICE.platform = function()
{
  if (PKDEVICE.platformOverride)
  {
    return PKDEVICE.platformOverride.toLowerCase();
  }
  if (!device)
  {
    if (navigator.platform == "iPad" ||
        navigator.platform == "iPad Simulator" ||
        navigator.platform == "iPhone" || 
        navigator.platform == "iPhone Simulator" ||
        navigator.platform == "iPod" )
    {
      return "ios";
    }
    if ( navigator.userAgent.toLowerCase().indexOf ("android") > -1 )
    {
      return "android";
    }
    return "unknown";
  }
  if (!device.platform)
  {
    if (navigator.platform == "iPad" ||
        navigator.platform == "iPad Simulator" ||
        navigator.platform == "iPhone" || 
        navigator.platform == "iPhone Simulator" ||
        navigator.platform == "iPod" )
    {
      return "ios";
    }
    if ( navigator.userAgent.toLowerCase().indexOf ("android") > -1 )
    {
      return "android";
    }
    return "unknown";
  }
  var thePlatform = device.platform.toLowerCase();
  //
  // turns out that for Cordova > 2.3, deivceplatform now returns iOS, so the
  // following is really not necessary on those versions. We leave it here
  // for those using Cordova <= 2.2.
  if (thePlatform.indexOf("ipad") > -1 || thePlatform.indexOf("iphone") > -1)
  {
    thePlatform = "ios";
  }
  return thePlatform;
}
/**
 *
 * Returns the device's form factor. Possible values are "tablet" and
 * "phone". If PKDEVICE.formFactorOverride is not false, it is returned
 * instead.
 *
 */
PKDEVICE.formFactor = function()
{
  if (PKDEVICE.formFactorOverride)
  {
    return PKDEVICE.formFactorOverride.toLowerCase();
  }
  if (navigator.platform == "iPad")
  {
    return "tablet";
  }
  if ((navigator.platform == "iPhone") || (navigator.platform == "iPhone Simulator"))
  {
    return "phone";
  }

  // the following is hacky, and not guaranteed to work all the time,
  // especially as phones get bigger screens.

  if (Math.max(window.screen.width, window.screen.height) < 1024)
  {
    return "phone";
  }
  return "tablet";
}
/**
 *
 * Determines if the device is in Portrait orientation.
 *
 */
PKDEVICE.isPortrait = function()
{
  return window.orientation === 0 || window.orientation == 180 || window.location.href.indexOf("portrait") > -1;
}
/**
 *
 * Determines if the device is in Landscape orientation.
 *
 */
PKDEVICE.isLandscape = function()
{
  if (window.location.href.indexOf("landscape") > -1)
  {
    return true;
  }
  return !PKDEVICE.isPortrait();
}
/**
 *
 * Determines if the device is a hiDPI device (aka retina)
 *
 */
PKDEVICE.isRetina = function()
{
  return window.devicePixelRatio > 1;
}

PKDEVICE.iPad = function ()
{
  return PKDEVICE.platform()==="ios" && PKDEVICE.formFactor()==="tablet";
}

PKDEVICE.iPhone = function ()
{
  return PKDEVICE.platform()==="ios" && PKDEVICE.formFactor()==="phone";
}

PKDEVICE.droidPhone = function ()
{
  return PKDEVICE.platform()==="android" && PKDEVICE.formFactor()==="phone";
}

PKDEVICE.droidTablet = function ()
{
  return PKDEVICE.platform()==="android" && PKDEVICE.formFactor()==="tablet";
}

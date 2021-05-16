const makeUniqueId = (key, originId) => {
    const originRouteIdB64 = Buffer.from(originId.toString()).toString('base64');
    const uniqueId = `${key}-${originRouteIdB64}`.toUpperCase();
    return uniqueId;
}

module.exports = {
    makeUniqueId
}
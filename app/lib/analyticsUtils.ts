import { UAParser } from 'ua-parser-js';

export function parseUserAgent(userAgent: string) {
    const parser = new UAParser(userAgent);
    const osName = parser.getOS().name || 'Unknown OS';
    const deviceType = parser.getDevice().type || 'desktop';
    return { osName, deviceName: deviceType };
}

// Update Clicks by Date keeping recent 7 days
export function updateClicksByDate(clicksByDate: any[], today: string) {
    const recentClicks = clicksByDate.filter(click => {
        const clickDate = new Date(click.date).toISOString().split('T')[0];
        const diff = (new Date(today).getTime() - new Date(clickDate).getTime()) / (1000 * 3600 * 24);
        return diff < 7;
    });

    const todayClick = recentClicks.find(click => click.date === today);
    if (todayClick) {
        todayClick.count += 1;
    } else {
        recentClicks.push({ date: today, count: 1 });
    }

    return recentClicks;
}

export function updateOSType(osType: any[], osName: string, ip: string) {
    const osRecord = osType.find(os => os.osName === osName);
    if (osRecord) {
        osRecord.uniqueClicks += 1;
        if (!osRecord.uniqueIPs.includes(ip)) {
            osRecord.uniqueIPs.push(ip);
            osRecord.uniqueUsers += 1;
        }
    } else {
        osType.push({
            osName,
            uniqueClicks: 1,
            uniqueUsers: 1,
            uniqueIPs: [ip]
        });
    }
    return osType;
}
export function updateDeviceType(deviceType: any[], deviceName: string, ip: string) {
    const deviceRecord = deviceType.find(device => device.deviceName === deviceName);
    if (deviceRecord) {
        deviceRecord.uniqueClicks += 1;
        if (!deviceRecord.uniqueIPs.includes(ip)) {
            deviceRecord.uniqueIPs.push(ip);
            deviceRecord.uniqueUsers += 1;
        }
    } else {
        deviceType.push({
            deviceName,
            uniqueClicks: 1,
            uniqueUsers: 1,
            uniqueIPs: [ip]
        });
    }
    return deviceType;
}

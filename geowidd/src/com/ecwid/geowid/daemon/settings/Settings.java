/*
 * Copyright (c) 2012, Creative Development LLC
 * Available under the New BSD license
 * see http://github.com/injecto/geowid for details
 */

package com.ecwid.geowid.daemon.settings;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

/**
 * Настройки приложения
 */
@XmlRootElement(name = "settings")
public class Settings {

    public String getLogFileCatalog() {
        return logFileCatalog;
    }

    public String getLogFilePattern() {
        return logFilePattern;
    }

    public long getUpdatePeriod() {
        return updatePeriod;
    }

    public String getCacheFilePath() {
        return cacheFilePath;
    }

    public long getCacheRecordTtl() {
        return cacheRecordTtl;
    }

    public String getResolverDB() {
        return resolverDB;
    }

    public String getServerUrl() {
        return serverUrl;
    }

    public int getChunkSize() {
        return chunkSize;
    }

    public List<Event> getEvents() {
        return events;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder();
        sb.append("Settings");
        sb.append("{logFileCatalog='").append(logFileCatalog).append('\'');
        sb.append(", logFilePattern='").append(logFilePattern).append('\'');
        sb.append(", updatePeriod=").append(updatePeriod);
        sb.append(", cacheFilePath='").append(cacheFilePath).append('\'');
        sb.append(", cacheRecordTtl=").append(cacheRecordTtl);
        sb.append(", resolverDB='").append(resolverDB).append('\'');
        sb.append(", serverUrl='").append(serverUrl).append('\'');
        sb.append(", chunkSize=").append(chunkSize);
        sb.append(", events=").append(events);
        sb.append('}');
        return sb.toString();
    }

    @XmlElement(name = "log-file-catalog")
    private String logFileCatalog;
    @XmlElement(name = "log-file-pattern")
    private String logFilePattern;
    @XmlElement(name = "update-period")
    private long updatePeriod;
    @XmlElement(name = "ip-resolver-cache-file")
    private String cacheFilePath;
    @XmlElement(name = "ip-resolver-rec-ttl")
    private long cacheRecordTtl;
    @XmlElement(name = "ip-resolver-db")
    private String resolverDB;
    @XmlElement(name = "server-url")
    private String serverUrl;
    @XmlElement(name = "chunk-size")
    private int chunkSize;
    @XmlElementWrapper(name = "events")
    @XmlElement(name = "event")
    private List<Event> events;
}

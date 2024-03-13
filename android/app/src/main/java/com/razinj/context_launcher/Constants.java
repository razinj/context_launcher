package com.razinj.context_launcher;

public class Constants {
    private Constants() {
        super();
    }

    public static final String INTENT_PACKAGE_SCHEME = "package";

    // Package change intent action
    public static final String PACKAGE_CHANGE_INTENT_ACTION = "packageChangeIntentAction";

    // Package change event
    public static final String PACKAGE_CHANGE_EVENT_NAME = "packageChange";
    public static final String PACKAGE_CHANGE_EVENT_NAME_X = "packageChangeX";
    public static final String PACKAGE_CHANGE_EVENT_PACKAGE_NAME = "packageName";
    public static final String PACKAGE_CHANGE_EVENT_IS_PACKAGE_REMOVED = "isRemoved";
}

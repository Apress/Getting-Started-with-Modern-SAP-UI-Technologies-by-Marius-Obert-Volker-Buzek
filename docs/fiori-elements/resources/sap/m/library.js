/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/base/DataType","sap/ui/base/EventProvider","sap/ui/core/Control","sap/base/util/ObjectPath","sap/ui/util/openWindow","sap/ui/core/library","sap/base/strings/capitalize","sap/ui/thirdparty/jquery","sap/base/assert","sap/base/Log","sap/base/util/defineLazyProperty","sap/base/security/encodeCSS","./AvatarShape","./AvatarSize","./AvatarType","./AvatarColor","./AvatarImageFitType","./IllustratedMessageSize","./IllustratedMessageType","./upload/UploaderHttpRequestMethod","sap/ui/core/theming/Parameters","sap/ui/core/LocaleData","sap/ui/core/Configuration","./Support"],function(e,t,a,n,i,o,r,s,l,p,m,u,c,d,g,T,S,f,A,y,I,C,h,v){"use strict";var b=sap.ui.getCore().initLibrary({name:"sap.m",version:"1.113.0",dependencies:["sap.ui.core"],designtime:"sap/m/designtime/library.designtime",types:["sap.m.AvatarImageFitType","sap.m.AvatarShape","sap.m.AvatarSize","sap.m.AvatarType","sap.m.AvatarColor","sap.m.BackgroundDesign","sap.m.BadgeState","sap.m.BadgeAnimationType","sap.m.BarDesign","sap.m.BreadcrumbsSeparatorStyle","sap.m.ButtonType","sap.m.CarouselArrowsPlacement","sap.m.DateTimeInputType","sap.m.DeviationIndicator","sap.m.DialogRoleType","sap.m.DialogType","sap.m.DraftIndicatorState","sap.m.FacetFilterListDataType","sap.m.FacetFilterType","sap.m.FlexAlignContent","sap.m.FlexAlignItems","sap.m.FlexAlignSelf","sap.m.FlexDirection","sap.m.FlexJustifyContent","sap.m.FlexRendertype","sap.m.FlexWrap","sap.m.FrameType","sap.m.GenericTagDesign","sap.m.GenericTagValueState","sap.m.GenericTileMode","sap.m.Priority","sap.m.GenericTileScope","sap.m.HeaderLevel","sap.m.IBarHTMLTag","sap.m.IconTabDensityMode","sap.m.IconTabFilterDesign","sap.m.IconTabHeaderMode","sap.m.IllustratedMessageSize","sap.m.IllustratedMessageType","sap.m.ImageMode","sap.m.InputTextFormatMode","sap.m.InputType","sap.m.LabelDesign","sap.m.LightBoxLoadingStates","sap.m.LinkConversion","sap.m.LinkAccessibleRole","sap.m.ListGrowingDirection","sap.m.ListHeaderDesign","sap.m.ListKeyboardMode","sap.m.ListMode","sap.m.ListSeparators","sap.m.ListType","sap.m.LoadState","sap.m.MenuButtonMode","sap.m.MultiSelectMode","sap.m.ObjectHeaderPictureShape","sap.m.ObjectMarkerType","sap.m.ObjectMarkerVisibility","sap.m.OverflowToolbarPriority","sap.m.P13nPanelType","sap.m.P13nConditionOperation","sap.m.PageBackgroundDesign","sap.m.PanelAccessibleRole","sap.m.PDFViewerDisplayType","sap.m.PlacementType","sap.m.PlanningCalendarBuiltInView","sap.m.PlanningCalendarStickyMode","sap.m.PopinDisplay","sap.m.PopinLayout","sap.m.QuickViewGroupElementType","sap.m.RatingIndicatorVisualMode","sap.m.ScreenSize","sap.m.SelectColumnRatio","sap.m.SelectionDetailsActionLevel","sap.m.SelectListKeyboardNavigationMode","sap.m.SelectType","sap.m.Size","sap.m.SplitAppMode","sap.m.StandardDynamicDateRangeKeys","sap.m.StandardTileType","sap.m.StepInputStepModeType","sap.m.StepInputValidationMode","sap.m.Sticky","sap.m.StringFilterOperator","sap.m.SwipeDirection","sap.m.SwitchType","sap.m.TabsOverflowMode","sap.m.TileSizeBehavior","sap.m.TimePickerMaskMode","sap.m.TitleAlignment","sap.m.TokenizerRenderMode","sap.m.ToolbarDesign","sap.m.ToolbarStyle","sap.m.UploadState","sap.m.ValueColor","sap.m.ValueCSSColor","sap.m.VerticalPlacementType","sap.m.WrappingType","sap.m.WizardRenderMode","sap.m.semantic.SemanticRuleSetType","sap.m.table.columnmenu.Category","sap.m.upload.UploaderHttpRequestMethod"],interfaces:["sap.m.IBar","sap.m.IBadge","sap.m.IBreadcrumbs","sap.m.p13n.IContent","sap.m.IconTab","sap.m.IScale","sap.m.semantic.IGroup","sap.m.semantic.IFilter","sap.m.semantic.ISort","sap.m.ObjectHeaderContainer","sap.m.IOverflowToolbarContent","sap.m.IOverflowToolbarFlexibleContent","sap.m.IToolbarInteractiveControl","sap.m.IHyphenation"],controls:["sap.m.ActionListItem","sap.m.ActionSelect","sap.m.ActionSheet","sap.m.ActionTile","sap.m.ActionTileContent","sap.m.App","sap.m.Avatar","sap.m.Bar","sap.m.BusyDialog","sap.m.BusyIndicator","sap.m.Button","sap.m.Breadcrumbs","sap.m.Carousel","sap.m.CheckBox","sap.m.ColumnHeaderPopover","sap.m.ColumnListItem","sap.m.ColorPalette","sap.m.ColorPalettePopover","sap.m.ComboBox","sap.m.ComboBoxTextField","sap.m.ComboBoxBase","sap.m.CustomAttribute","sap.m.CustomListItem","sap.m.CustomTile","sap.m.CustomTreeItem","sap.m.DatePicker","sap.m.DateRangeSelection","sap.m.DateTimeField","sap.m.DateTimeInput","sap.m.DateTimePicker","sap.m.Dialog","sap.m.DisplayListItem","sap.m.DraftIndicator","sap.m.DynamicDateRange","sap.m.ExpandableText","sap.m.AdditionalTextButton","sap.m.FacetFilter","sap.m.FacetFilterItem","sap.m.FacetFilterList","sap.m.FeedContent","sap.m.FeedInput","sap.m.FeedListItem","sap.m.FlexBox","sap.m.FormattedText","sap.m.GenericTag","sap.m.GenericTile","sap.m.GroupHeaderListItem","sap.m.GrowingList","sap.m.HBox","sap.m.HeaderContainer","sap.m.IconTabBar","sap.m.IconTabBarSelectList","sap.m.IconTabFilterExpandButtonBadge","sap.m.IconTabHeader","sap.m.IllustratedMessage","sap.m.Image","sap.m.ImageContent","sap.m.Input","sap.m.InputBase","sap.m.InputListItem","sap.m.Label","sap.m.LightBox","sap.m.Link","sap.m.List","sap.m.ListBase","sap.m.ListItemBase","sap.m.MaskInput","sap.m.Menu","sap.m.MenuButton","sap.m.MessagePage","sap.m.MessagePopover","sap.m.MessageView","sap.m.MessageStrip","sap.m.MultiComboBox","sap.m.MultiEditField","sap.m.MultiInput","sap.m.NavContainer","sap.m.NewsContent","sap.m.NumericContent","sap.m.NotificationList","sap.m.NotificationListBase","sap.m.NotificationListItem","sap.m.NotificationListGroup","sap.m.PagingButton","sap.m.PlanningCalendarLegend","sap.m.ObjectAttribute","sap.m.ObjectHeader","sap.m.ObjectIdentifier","sap.m.ObjectListItem","sap.m.ObjectMarker","sap.m.ObjectNumber","sap.m.ObjectStatus","sap.m.OverflowToolbar","sap.m.OverflowToolbarButton","sap.m.OverflowToolbarToggleButton","sap.m.OverflowToolbarMenuButton","sap.m.P13nColumnsPanel","sap.m.P13nGroupPanel","sap.m.P13nSelectionPanel","sap.m.P13nDimMeasurePanel","sap.m.P13nConditionPanel","sap.m.P13nDialog","sap.m.P13nFilterPanel","sap.m.P13nPanel","sap.m.P13nSortPanel","sap.m.Page","sap.m.Panel","sap.m.PDFViewer","sap.m.PlanningCalendar","sap.m.PlanningCalendarHeader","sap.m.Popover","sap.m.ProgressIndicator","sap.m.PullToRefresh","sap.m.QuickView","sap.m.QuickViewBase","sap.m.QuickViewCard","sap.m.QuickViewPage","sap.m.RadioButton","sap.m.RadioButtonGroup","sap.m.RangeSlider","sap.m.RatingIndicator","sap.m.ResponsivePopover","sap.m.ScrollContainer","sap.m.SearchField","sap.m.SegmentedButton","sap.m.Select","sap.m.SelectDialog","sap.m.SelectDialogBase","sap.m.SelectList","sap.m.SelectionDetails","sap.m.Shell","sap.m.SimpleFixFlex","sap.m.SinglePlanningCalendar","sap.m.SinglePlanningCalendarGrid","sap.m.SinglePlanningCalendarMonthGrid","sap.m.Slider","sap.m.SliderTooltip","sap.m.SliderTooltipBase","sap.m.SliderTooltipContainer","sap.m.SlideTile","sap.m.StepInput","sap.m.SplitApp","sap.m.SplitContainer","sap.m.StandardListItem","sap.m.StandardTreeItem","sap.m.StandardTile","sap.m.Switch","sap.m.Table","sap.m.TableSelectDialog","sap.m.TabContainer","sap.m.TabStrip","sap.m.Text","sap.m.TextArea","sap.m.Tile","sap.m.TileContainer","sap.m.TileContent","sap.m.TimePicker","sap.m.TimePickerInputs","sap.m.TimePickerClock","sap.m.TimePickerClocks","sap.m.TimePickerSliders","sap.m.Title","sap.m.ToggleButton","sap.m.Token","sap.m.Tokenizer","sap.m.Toolbar","sap.m.ToolbarSpacer","sap.m.ToolbarSeparator","sap.m.Tree","sap.m.TreeItemBase","sap.m.UploadCollection","sap.m.UploadCollectionToolbarPlaceholder","sap.m.upload.UploadSet","sap.m.upload.UploadSetToolbarPlaceholder","sap.m.VariantManagement","sap.m.VBox","sap.m.ViewSettingsDialog","sap.m.WheelSlider","sap.m.WheelSliderContainer","sap.m.Wizard","sap.m.WizardStep","sap.m.semantic.DetailPage","sap.m.semantic.SemanticPage","sap.m.semantic.ShareMenuPage","sap.m.semantic.FullscreenPage","sap.m.semantic.MasterPage","sap.m.p13n.AbstractContainer","sap.m.p13n.BasePanel","sap.m.p13n.Container","sap.m.p13n.GroupPanel","sap.m.p13n.QueryPanel","sap.m.p13n.SelectionPanel","sap.m.p13n.SortPanel","sap.m.p13n.Popup","sap.m.table.columnmenu.Menu"],elements:["sap.m.BadgeCustomData","sap.m.Column","sap.m.ColumnPopoverActionItem","sap.m.ColumnPopoverCustomItem","sap.m.ColumnPopoverItem","sap.m.ColumnPopoverSortItem","sap.m.CustomDynamicDateOption","sap.m.DynamicDateOption","sap.m.DynamicDateValueHelpUIType","sap.m.FlexItemData","sap.m.FeedListItemAction","sap.m.IconTabFilter","sap.m.IconTabSeparator","sap.m.LightBoxItem","sap.m.OverflowToolbarLayoutData","sap.m.MaskInputRule","sap.m.MenuItem","sap.m.MessageItem","sap.m.MessagePopoverItem","sap.m.PageAccessibleLandmarkInfo","sap.m.P13nFilterItem","sap.m.P13nItem","sap.m.PlanningCalendarRow","sap.m.PlanningCalendarView","sap.m.P13nColumnsItem","sap.m.P13nDimMeasureItem","sap.m.P13nGroupItem","sap.m.P13nSortItem","sap.m.QuickViewGroup","sap.m.QuickViewGroupElement","sap.m.ResponsiveScale","sap.m.SegmentedButtonItem","sap.m.SelectionDetailsItem","sap.m.SelectionDetailsItemLine","sap.m.SinglePlanningCalendarDayView","sap.m.SinglePlanningCalendarMonthView","sap.m.SinglePlanningCalendarWeekView","sap.m.SinglePlanningCalendarWorkWeekView","sap.m.SinglePlanningCalendarView","sap.m.StandardDynamicDateOption","sap.m.SuggestionItem","sap.m.TabContainerItem","sap.m.TabStripItem","sap.m.ToolbarLayoutData","sap.m.UploadCollectionItem","sap.m.UploadCollectionParameter","sap.m.upload.Uploader","sap.m.upload.UploadSetItem","sap.m.VariantItem","sap.m.ViewSettingsCustomItem","sap.m.ViewSettingsCustomTab","sap.m.ViewSettingsFilterItem","sap.m.ViewSettingsItem","sap.m.plugins.CellSelector","sap.m.plugins.ColumnResizer","sap.m.plugins.CopyProvider","sap.m.plugins.DataStateIndicator","sap.m.plugins.PasteProvider","sap.m.plugins.PluginBase","sap.m.p13n.AbstractContainerItem","sap.m.semantic.AddAction","sap.m.semantic.CancelAction","sap.m.semantic.DeleteAction","sap.m.semantic.DiscussInJamAction","sap.m.semantic.EditAction","sap.m.semantic.FavoriteAction","sap.m.semantic.FilterAction","sap.m.semantic.FilterSelect","sap.m.semantic.FlagAction","sap.m.semantic.ForwardAction","sap.m.semantic.GroupAction","sap.m.semantic.GroupSelect","sap.m.semantic.MainAction","sap.m.semantic.MessagesIndicator","sap.m.semantic.MultiSelectAction","sap.m.semantic.NegativeAction","sap.m.semantic.OpenInAction","sap.m.semantic.PositiveAction","sap.m.semantic.PrintAction","sap.m.semantic.SaveAction","sap.m.semantic.SemanticButton","sap.m.semantic.SemanticControl","sap.m.semantic.SemanticSelect","sap.m.semantic.SemanticToggleButton","sap.m.semantic.SendEmailAction","sap.m.semantic.SendMessageAction","sap.m.semantic.ShareInJamAction","sap.m.semantic.SortAction","sap.m.semantic.SortSelect","sap.m.table.columnmenu.Entry","sap.m.table.columnmenu.ActionItem","sap.m.table.columnmenu.Item","sap.m.table.columnmenu.ItemBase","sap.m.table.columnmenu.QuickAction","sap.m.table.columnmenu.QuickActionBase"],extensions:{flChangeHandlers:{"sap.m.ActionSheet":{moveControls:"default"},"sap.m.Avatar":"sap/m/flexibility/Avatar","sap.m.Bar":"sap/m/flexibility/Bar","sap.m.Button":"sap/m/flexibility/Button","sap.m.CheckBox":"sap/m/flexibility/CheckBox","sap.m.ColumnListItem":{hideControl:"default",unhideControl:"default"},"sap.m.CustomListItem":{hideControl:"default",unhideControl:"default",moveControls:"default"},"sap.m.DatePicker":{hideControl:"default",unhideControl:"default"},"sap.m.Dialog":"sap/m/flexibility/Dialog","sap.m.ExpandableText":"sap/m/flexibility/ExpandableText","sap.m.FlexBox":{hideControl:"default",unhideControl:"default",moveControls:"default"},"sap.m.HBox":{hideControl:"default",unhideControl:"default",moveControls:"default"},"sap.m.IconTabBar":"sap/m/flexibility/IconTabBar","sap.m.IconTabFilter":"sap/m/flexibility/IconTabFilter","sap.m.Image":{hideControl:"default",unhideControl:"default"},"sap.m.Input":{hideControl:"default",unhideControl:"default"},"sap.m.InputBase":{hideControl:"default",unhideControl:"default"},"sap.m.InputListItem":"sap/m/flexibility/InputListItem","sap.m.Label":"sap/m/flexibility/Label","sap.m.MultiInput":{hideControl:"default",unhideControl:"default"},"sap.m.ListItemBase":{hideControl:"default",unhideControl:"default"},"sap.m.Link":"sap/m/flexibility/Link","sap.m.List":{hideControl:"default",unhideControl:"default",moveControls:"default"},"sap.m.ListBase":{hideControl:"default",unhideControl:"default",moveControls:"default"},"sap.m.MaskInput":{hideControl:"default",unhideControl:"default"},"sap.m.MenuButton":"sap/m/flexibility/MenuButton","sap.m.OverflowToolbar":"sap/m/flexibility/OverflowToolbar","sap.m.OverflowToolbarButton":"sap/m/flexibility/OverflowToolbarButton","sap.m.Page":"sap/m/flexibility/Page","sap.m.Panel":"sap/m/flexibility/Panel","sap.m.Popover":"sap/m/flexibility/Popover","sap.m.RadioButton":"sap/m/flexibility/RadioButton","sap.m.RatingIndicator":{hideControl:"default",unhideControl:"default"},"sap.m.RangeSlider":{hideControl:"default",unhideControl:"default"},"sap.m.ScrollContainer":{hideControl:"default",moveControls:"default",unhideControl:"default"},"sap.m.Slider":{hideControl:"default",unhideControl:"default"},"sap.m.StandardListItem":"sap/m/flexibility/StandardListItem","sap.m.Table":"sap/m/flexibility/Table","sap.m.Column":{hideControl:"default",unhideControl:"default"},"sap.m.Text":"sap/m/flexibility/Text","sap.m.Title":"sap/m/flexibility/Title","sap.m.Toolbar":"sap/m/flexibility/Toolbar","sap.m.VBox":{hideControl:"default",unhideControl:"default",moveControls:"default"}},"sap.ui.support":{publicRules:true,internalRules:true}}});b.upload=b.upload||{};b.upload.UploaderHttpRequestMethod=I;b.BackgroundDesign={Solid:"Solid",Transparent:"Transparent",Translucent:"Translucent"};b.BadgeState={Updated:"Updated",Appear:"Appear",Disappear:"Disappear"};b.BadgeAnimationType={Full:"Full",Update:"Update",None:"None"};b.EmptyIndicatorMode={On:"On",Off:"Off",Auto:"Auto"};b.BadgeStyle={Default:"Default",Attention:"Attention"};b.BarDesign={Auto:"Auto",Header:"Header",SubHeader:"SubHeader",Footer:"Footer"};b.BreadcrumbsSeparatorStyle={Slash:"Slash",BackSlash:"BackSlash",DoubleSlash:"DoubleSlash",DoubleBackSlash:"DoubleBackSlash",GreaterThan:"GreaterThan",DoubleGreaterThan:"DoubleGreaterThan"};b.ButtonType={Default:"Default",Back:"Back",Accept:"Accept",Reject:"Reject",Transparent:"Transparent",Ghost:"Ghost",Up:"Up",Unstyled:"Unstyled",Emphasized:"Emphasized",Critical:"Critical",Negative:"Negative",Success:"Success",Neutral:"Neutral",Attention:"Attention"};b.ButtonAccessibilityType={Default:"Default",Labelled:"Labelled",Described:"Described",Combined:"Combined"};b.CarouselArrowsPlacement={Content:"Content",PageIndicator:"PageIndicator"};b.PlanningCalendarBuiltInView={Hour:"Hour",Day:"Day",Month:"Month",Week:"Week",OneMonth:"One Month"};b.DateTimeInputType={Date:"Date",DateTime:"DateTime",Time:"Time"};b.DialogType={Standard:"Standard",Message:"Message"};b.DialogRoleType={Dialog:"dialog",AlertDialog:"alertdialog"};b.DeviationIndicator={Up:"Up",Down:"Down",None:"None"};b.DraftIndicatorState={Clear:"Clear",Saving:"Saving",Saved:"Saved"};b.FacetFilterListDataType={Date:"Date",DateTime:"DateTime",Time:"Time",Integer:"Integer",Float:"Float",String:"String",Boolean:"Boolean"};b.FacetFilterType={Simple:"Simple",Light:"Light"};b.FlexAlignItems={Start:"Start",End:"End",Center:"Center",Baseline:"Baseline",Stretch:"Stretch",Inherit:"Inherit"};b.FlexAlignSelf={Auto:"Auto",Start:"Start",End:"End",Center:"Center",Baseline:"Baseline",Stretch:"Stretch",Inherit:"Inherit"};b.FlexDirection={Row:"Row",Column:"Column",RowReverse:"RowReverse",ColumnReverse:"ColumnReverse",Inherit:"Inherit"};b.FlexJustifyContent={Start:"Start",End:"End",Center:"Center",SpaceBetween:"SpaceBetween",SpaceAround:"SpaceAround",Inherit:"Inherit"};b.FlexWrap={NoWrap:"NoWrap",Wrap:"Wrap",WrapReverse:"WrapReverse"};b.FlexAlignContent={Start:"Start",End:"End",Center:"Center",SpaceBetween:"SpaceBetween",SpaceAround:"SpaceAround",Stretch:"Stretch",Inherit:"Inherit"};b.FlexRendertype={Div:"Div",List:"List",Bare:"Bare"};b.FrameType={OneByOne:"OneByOne",TwoByOne:"TwoByOne",TwoThirds:"TwoThirds",Auto:"Auto",TwoByHalf:"TwoByHalf",OneByHalf:"OneByHalf",Stretch:"Stretch"};b.LinkConversion={None:"None",ProtocolOnly:"ProtocolOnly",All:"All"};b.LinkAccessibleRole={Default:"Default",Button:"Button"};b.InputTextFormatMode={Value:"Value",Key:"Key",ValueKey:"ValueKey",KeyValue:"KeyValue"};b.GenericTagDesign={Full:"Full",StatusIconHidden:"StatusIconHidden"};b.GenericTagValueState={None:"None",Error:"Error"};b.GenericTileMode={ContentMode:"ContentMode",HeaderMode:"HeaderMode",ActionMode:"ActionMode",ArticleMode:"ArticleMode",LineMode:"LineMode",IconMode:"IconMode"};b.Priority={VeryHigh:"VeryHigh",High:"High",Medium:"Medium",Low:"Low",None:"None"};b.GenericTileScope={Display:"Display",Actions:"Actions",ActionMore:"ActionMore",ActionRemove:"ActionRemove"};b.TabsOverflowMode={End:"End",StartAndEnd:"StartAndEnd"};b.TileSizeBehavior={Responsive:"Responsive",Small:"Small"};b.HeaderLevel={H1:"H1",H2:"H2",H3:"H3",H4:"H4",H5:"H5",H6:"H6"};b.IBarHTMLTag={Div:"Div",Header:"Header",Footer:"Footer"};b.IconTabHeaderMode={Standard:"Standard",Inline:"Inline"};b.IconTabDensityMode={Inherit:"Inherit",Compact:"Compact",Cozy:"Cozy"};b.IconTabFilterDesign={Horizontal:"Horizontal",Vertical:"Vertical"};b.ImageMode={Image:"Image",Background:"Background",InlineSvg:"InlineSvg"};b.Size={XS:"XS",S:"S",M:"M",L:"L",Auto:"Auto",Responsive:"Responsive"};b.ValueColor={Neutral:"Neutral",Good:"Good",Critical:"Critical",Error:"Error",None:"None"};b.ValueCSSColor=t.createType("sap.m.ValueCSSColor",{isValid:function(e){var t=b.ValueColor.hasOwnProperty(e);if(t){return t}else{t=r.CSSColor.isValid(e);if(t){return t}else{return r.CSSColor.isValid(C.get(e))}}}},t.getType("string"));b.SelectColumnRatio=t.createType("sap.m.SelectColumnRatio",{isValid:function(e){return/^([0-9]+:[0-9]+)$/.test(e)}},t.getType("string"));b.InputType={Text:"Text",Date:"Date",Datetime:"Datetime",DatetimeLocale:"DatetimeLocale",Email:"Email",Month:"Month",Number:"Number",Tel:"Tel",Time:"Time",Url:"Url",Week:"Week",Password:"Password"};b.LabelDesign={Bold:"Bold",Standard:"Standard"};b.ListHeaderDesign={Standard:"Standard",Plain:"Plain"};b.ListMode={None:"None",SingleSelect:"SingleSelect",SingleSelectLeft:"SingleSelectLeft",SingleSelectMaster:"SingleSelectMaster",MultiSelect:"MultiSelect",Delete:"Delete"};b.ListKeyboardMode={Navigation:"Navigation",Edit:"Edit"};b.ListGrowingDirection={Downwards:"Downwards",Upwards:"Upwards"};b.ListSeparators={All:"All",Inner:"Inner",None:"None"};b.ListType={Inactive:"Inactive",Detail:"Detail",Navigation:"Navigation",Active:"Active",DetailAndActive:"DetailAndActive"};b.SelectListKeyboardNavigationMode={None:"None",Delimited:"Delimited"};b.LoadState={Loading:"Loading",Loaded:"Loaded",Failed:"Failed",Disabled:"Disabled"};b.MenuButtonMode={Regular:"Regular",Split:"Split"};b.OverflowToolbarPriority={NeverOverflow:"NeverOverflow",Never:"Never",High:"High",Low:"Low",Disappear:"Disappear",AlwaysOverflow:"AlwaysOverflow",Always:"Always"};b.ObjectHeaderPictureShape={Circle:"Circle",Square:"Square"};b.P13nPanelType={sort:"sort",filter:"filter",group:"group",columns:"columns",dimeasure:"dimeasure",selection:"selection"};b.P13nPopupMode={Dialog:"Dialog",ResponsivePopover:"ResponsivePopover"};b.P13nConditionOperation={BT:"BT",EQ:"EQ",Contains:"Contains",StartsWith:"StartsWith",EndsWith:"EndsWith",LT:"LT",LE:"LE",GT:"GT",GE:"GE",Initial:"Initial",Empty:"Empty",NotBT:"NotBT",NotEQ:"NotEQ",NotContains:"NotContains",NotStartsWith:"NotStartsWith",NotEndsWith:"NotEndsWith",NotLT:"NotLT",NotLE:"NotLE",NotGT:"NotGT",NotGE:"NotGE",NotInitial:"NotInitial",NotEmpty:"NotEmpty",Ascending:"Ascending",Descending:"Descending",GroupAscending:"GroupAscending",GroupDescending:"GroupDescending",Total:"Total",Average:"Average",Minimum:"Minimum",Maximum:"Maximum"};b.P13nConditionOperationType={Include:"Include",Exclude:"Exclude"};b.PageBackgroundDesign={Standard:"Standard",List:"List",Solid:"Solid",Transparent:"Transparent"};b.PanelAccessibleRole={Complementary:"Complementary",Form:"Form",Region:"Region"};b.PDFViewerDisplayType={Auto:"Auto",Embedded:"Embedded",Link:"Link"};b.PlacementType={Left:"Left",Right:"Right",Top:"Top",Bottom:"Bottom",Vertical:"Vertical",VerticalPreferedTop:"VerticalPreferedTop",VerticalPreferredTop:"VerticalPreferredTop",VerticalPreferedBottom:"VerticalPreferedBottom",VerticalPreferredBottom:"VerticalPreferredBottom",Horizontal:"Horizontal",HorizontalPreferedRight:"HorizontalPreferedRight",HorizontalPreferredRight:"HorizontalPreferredRight",HorizontalPreferedLeft:"HorizontalPreferedLeft",HorizontalPreferredLeft:"HorizontalPreferredLeft",PreferredLeftOrFlip:"PreferredLeftOrFlip",PreferredRightOrFlip:"PreferredRightOrFlip",PreferredTopOrFlip:"PreferredTopOrFlip",PreferredBottomOrFlip:"PreferredBottomOrFlip",Auto:"Auto"};b.StandardDynamicDateRangeKeys={DATE:"DATE",DATETIME:"DATETIME",TODAY:"TODAY",YESTERDAY:"YESTERDAY",TOMORROW:"TOMORROW",FIRSTDAYWEEK:"FIRSTDAYWEEK",LASTDAYWEEK:"LASTDAYWEEK",FIRSTDAYMONTH:"FIRSTDAYMONTH",LASTDAYMONTH:"LASTDAYMONTH",FIRSTDAYQUARTER:"FIRSTDAYQUARTER",LASTDAYQUARTER:"LASTDAYQUARTER",FIRSTDAYYEAR:"FIRSTDAYYEAR",LASTDAYYEAR:"LASTDAYYEAR",DATERANGE:"DATERANGE",DATETIMERANGE:"DATETIMERANGE",FROM:"FROM",TO:"TO",FROMDATETIME:"FROMDATETIME",TODATETIME:"TODATETIME",YEARTODATE:"YEARTODATE",DATETOYEAR:"DATETOYEAR",LASTMINUTES:"LASTMINUTES",LASTHOURS:"LASTHOURS",LASTDAYS:"LASTDAYS",LASTWEEKS:"LASTWEEKS",LASTMONTHS:"LASTMONTHS",LASTQUARTERS:"LASTQUARTERS",LASTYEARS:"LASTYEARS",NEXTMINUTES:"NEXTMINUTES",NEXTHOURS:"NEXTHOURS",NEXTDAYS:"NEXTDAYS",NEXTWEEKS:"NEXTWEEKS",NEXTMONTHS:"NEXTMONTHS",NEXTQUARTERS:"NEXTQUARTERS",NEXTYEARS:"NEXTYEARS",TODAYFROMTO:"TODAYFROMTO",THISWEEK:"THISWEEK",LASTWEEK:"LASTWEEK",NEXTWEEK:"NEXTWEEK",SPECIFICMONTH:"SPECIFICMONTH",SPECIFICMONTHINYEAR:"SPECIFICMONTHINYEAR",THISMONTH:"THISMONTH",LASTMONTH:"LASTMONTH",NEXTMONTH:"NEXTMONTH",THISQUARTER:"THISQUARTER",LASTQUARTER:"LASTQUARTER",NEXTQUARTER:"NEXTQUARTER",QUARTER1:"QUARTER1",QUARTER2:"QUARTER2",QUARTER3:"QUARTER3",QUARTER4:"QUARTER4",THISYEAR:"THISYEAR",LASTYEAR:"LASTYEAR",NEXTYEAR:"NEXTYEAR"};b.QuickViewGroupElementType={phone:"phone",mobile:"mobile",email:"email",link:"link",text:"text",pageLink:"pageLink"};b.VerticalPlacementType={Top:"Top",Bottom:"Bottom",Vertical:"Vertical"};b.PopinDisplay={Block:"Block",Inline:"Inline",WithoutHeader:"WithoutHeader"};b.PopinLayout={Block:"Block",GridSmall:"GridSmall",GridLarge:"GridLarge"};b.Sticky={ColumnHeaders:"ColumnHeaders",HeaderToolbar:"HeaderToolbar",InfoToolbar:"InfoToolbar"};b.RatingIndicatorVisualMode={Full:"Full",Half:"Half"};b.ScreenSize={Phone:"Phone",Tablet:"Tablet",Desktop:"Desktop",XXSmall:"XXSmall",XSmall:"XSmall",Small:"Small",Medium:"Medium",Large:"Large",XLarge:"XLarge",XXLarge:"XXLarge"};b.SelectionDetailsActionLevel={Item:"Item",List:"List",Group:"Group"};b.SelectType={Default:"Default",IconOnly:"IconOnly"};b.SplitAppMode={ShowHideMode:"ShowHideMode",StretchCompressMode:"StretchCompressMode",PopoverMode:"PopoverMode",HideMode:"HideMode"};b.StandardTileType={Create:"Create",Monitor:"Monitor",None:"None"};b.semantic=b.semantic||{};b.semantic.SemanticRuleSetType={Classic:"Classic",Optimized:"Optimized"};b.table=b.table||{};b.table.columnmenu=b.table.columnmenu||{};b.table.columnmenu.Category={Sort:"Sort",Filter:"Filter",Group:"Group",Aggregate:"Aggregate",Generic:"Generic"};b.ObjectMarkerType={Flagged:"Flagged",Favorite:"Favorite",Draft:"Draft",Locked:"Locked",Unsaved:"Unsaved",LockedBy:"LockedBy",UnsavedBy:"UnsavedBy"};b.ObjectMarkerVisibility={IconOnly:"IconOnly",TextOnly:"TextOnly",IconAndText:"IconAndText"};b.SwipeDirection={LeftToRight:"LeftToRight",RightToLeft:"RightToLeft",BeginToEnd:"BeginToEnd",EndToBegin:"EndToBegin",Both:"Both"};b.SwitchType={Default:"Default",AcceptReject:"AcceptReject"};b.TokenizerRenderMode={Loose:"Loose",Narrow:"Narrow"};b.ToolbarDesign={Auto:"Auto",Transparent:"Transparent",Info:"Info",Solid:"Solid"};b.ToolbarStyle={Standard:"Standard",Clear:"Clear"};b.TimePickerMaskMode={On:"On",Off:"Off"};b.StringFilterOperator={Equals:"Equals",Contains:"Contains",StartsWith:"StartsWith",AnyWordStartsWith:"AnyWordStartsWith"};b.LightBoxLoadingStates={Loading:"LOADING",Loaded:"LOADED",TimeOutError:"TIME_OUT_ERROR",Error:"ERROR"};b.StepInputValidationMode={FocusOut:"FocusOut",LiveChange:"LiveChange"};b.StepInputStepModeType={AdditionAndSubtraction:"AdditionAndSubtraction",Multiple:"Multiple"};b.UploadState={Complete:"Complete",Error:"Error",Ready:"Ready",Uploading:"Uploading"};b.WrappingType={Normal:"Normal",Hyphenated:"Hyphenated"};b.SinglePlanningCalendarSelectionMode={SingleSelect:"SingleSelect",MultiSelect:"MultiSelect"};b.PlanningCalendarStickyMode={None:"None",All:"All",NavBarAndColHeaders:"NavBarAndColHeaders"};b.TitleAlignment={None:"None",Auto:"Auto",Start:"Start",Center:"Center"};b.ExpandableTextOverflowMode={InPlace:"InPlace",Popover:"Popover"};b.AvatarShape=d;b.AvatarSize=g;b.AvatarType=T;b.AvatarColor=S;b.AvatarImageFitType=f;b.IllustratedMessageSize=A;b.IllustratedMessageType=y;b.WizardRenderMode={Scroll:"Scroll",Page:"Page"};b.ResetAllMode={Default:"Default",ServiceDefault:"ServiceDefault",ServiceReset:"ServiceReset"};b.MultiSelectMode={Default:"Default",ClearAll:"ClearAll",SelectAll:"SelectAll"};(function(){sap.ui.lazyRequire("sap.m.DynamicDate");sap.ui.lazyRequire("sap.m.MessageToast","show");sap.ui.lazyRequire("sap.m.routing.RouteMatchedHandler");sap.ui.lazyRequire("sap.m.routing.Router");sap.ui.lazyRequire("sap.m.routing.Target");sap.ui.lazyRequire("sap.m.routing.TargetHandler");sap.ui.lazyRequire("sap.m.routing.Targets")})();if(/sap-ui-xx-formfactor=compact/.test(location.search)){l("html").addClass("sapUiSizeCompact");b._bSizeCompact=true}if(/sap-ui-xx-formfactor=condensed/.test(location.search)){l("html").addClass("sapUiSizeCondensed");b._bSizeCondensed=true}b.getInvalidDate=function(){return null};b.getLocale=function(){var e=v.getFormatSettings().getFormatLocale();b.getLocale=function(){return e};return e};b.getLocaleData=function(){var e=h.getInstance(b.getLocale());b.getLocaleData=function(){return e};return e};b.isDate=function(e){return e&&Object.prototype.toString.call(e)=="[object Date]"&&!isNaN(e)};b.getIScroll=function(e){if(typeof window.iScroll!="function"||!(e instanceof n)){return}var t,a;for(t=e;t=t.oParent;){a=t.getScrollDelegate?t.getScrollDelegate()._scroller:null;if(a&&a instanceof window.iScroll){return a}}};b.getScrollDelegate=function(e,t){if(!(e instanceof n)){return}var a=sap.ui.require("sap/ui/core/UIComponent");function i(e){if(!e){return}return t&&a&&e instanceof a?e.oContainer:e.oParent}for(var o=e;o=i(o);){if(o&&typeof o.getScrollDelegate=="function"){return o.getScrollDelegate(e)}}};b.ScreenSizes={phone:240,tablet:600,desktop:1024,xxsmall:240,xsmall:320,small:480,medium:560,large:768,xlarge:960,xxlarge:1120};u(b,"BaseFontSize",function(){b.BaseFontSize=l(document.documentElement).css("font-size")||"16px";return b.BaseFontSize});b.closeKeyboard=function(){var t=document.activeElement;if(!e.system.desktop&&t&&/(INPUT|TEXTAREA)/i.test(t.tagName)){t.blur()}};b.touch=b.touch||{};b.touch.find=function(e,t){var a,n;if(!e){return}if(t&&typeof t.identifier!=="undefined"){t=t.identifier}else if(typeof t!=="number"){p(false,"sap.m.touch.find(): oTouch must be a touch object or a number");return}n=e.length;for(a=0;a<n;a++){if(e[a].identifier===t){return e[a]}}};b.touch.countContained=function(e,t){var a,n=0,i,o,r;if(!e){return 0}if(t instanceof Element){t=l(t)}else if(typeof t==="string"){t=l(document.getElementById(t))}else if(!(t instanceof l)){p(false,"sap.m.touch.countContained(): vElement must be a jQuery object or Element reference or a string");return 0}o=t.children().length;i=e.length;for(a=0;a<i;a++){r=l(e[a].target);if(o===0&&r.is(t)||t[0].contains(r[0])){n++}}return n};b.URLHelper=function(){function e(e){return e&&Object.prototype.toString.call(e)=="[object String]"}function t(t){if(!e(t)){return""}return t.replace(/[^0-9\+\*#]/g,"")}function n(t){if(!e(t)){return""}t=t.split(/\r\n|\r|\n/g).join("\r\n");return encodeURIComponent(t)}return l.extend(new a,{normalizeTel:function(e){return"tel:"+t(e)},normalizeSms:function(e){return"sms:"+t(e)},normalizeEmail:function(t,a,i,o,r){var s=[],l="mailto:",p=encodeURIComponent;e(t)&&(l+=p(t.trim()));e(a)&&s.push("subject="+p(a));e(i)&&s.push("body="+n(i));e(r)&&s.push("bcc="+p(r.trim()));e(o)&&s.push("cc="+p(o.trim()));if(s.length){l+="?"+s.join("&")}return l},redirect:function(t,a){p(e(t),this+"#redirect: URL must be a string");this.fireEvent("redirect",t);if(!a){window.location.href=t}else{o(t,"_blank")}},attachRedirect:function(e,t){return this.attachEvent("redirect",e,t)},detachRedirect:function(e,t){return this.detachEvent("redirect",e,t)},triggerTel:function(e){this.redirect(this.normalizeTel(e))},triggerSms:function(e){this.redirect(this.normalizeSms(e))},triggerEmail:function(e,t,a,n,i,o){o=o||false;this.redirect(this.normalizeEmail.apply(0,[e,t,a,n,i]),o)},toString:function(){return"sap.m.URLHelper"}})}();b.BackgroundHelper={addBackgroundColorStyles:function(e,a,n,i){e.class(i||"sapUiGlobalBackgroundColor");if(a&&!t.getType("sap.ui.core.CSSColor").isValid(a)){m.warning(a+" is not a valid sap.ui.core.CSSColor type");a=""}if(a||n){e.style("background-image","none");e.style("filter","none")}if(a){e.style("background-color",a)}},renderBackgroundImageTag:function(e,t,a,n,i,o){e.openStart("div",t.getId()+"-BG");if(Array.isArray(a)){for(var r=0;r<a.length;r++){e.class(a[r])}}else{e.class(a)}e.class("sapUiGlobalBackgroundImage");if(n){e.style("display","block");e.style("background-image","url("+c(n)+")");e.style("background-repeat",i?"repeat":"no-repeat");if(!i){e.style("background-size","cover");e.style("background-position","center")}else{e.style("background-position","left top")}}if(o!==1){if(o>1){o=1}e.style("opacity",o)}e.openEnd();e.close("div")}};b.ImageHelper=function(){function e(e,t,a){if(a!==undefined){var n=e["set"+s(t)];if(typeof n==="function"){n.call(e,a);return true}}return false}var t={getImageControl:function(t,a,n,i,o,r){p(i.src,"sap.m.ImageHelper.getImageControl: mProperties do not contain 'src'");if(a&&a.getSrc()!=i.src){a.destroy();a=undefined}if(a&&(a instanceof sap.m.Image||a instanceof sap.ui.core.Icon)){for(var s in i){e(a,s,i[s])}}else{var l=Object.assign({},i,{id:t});a=sap.ui.core.IconPool.createControlByURI(l,sap.m.Image);a.setParent(n,null,true)}if(r){for(var m=0,u=r.length;m!==u;m++){a.removeStyleClass(r[m])}}if(o){for(var c=0,d=o.length;c!==d;c++){a.addStyleClass(o[c])}}return a}};return t}();b.PopupHelper={calcPercentageSize:function(e,t){if(typeof e!=="string"){m.warning("sap.m.PopupHelper: calcPercentageSize, the first parameter"+e+"isn't with type string");return null}if(e.indexOf("%")<=0){m.warning("sap.m.PopupHelper: calcPercentageSize, the first parameter"+e+"is not a percentage string (for example '25%')");return null}var a=parseFloat(e)/100,n=parseFloat(t);return Math.floor(a*n)+"px"}};b.InputODataSuggestProvider=function(){var e=function(e){var t=e.getSource();var a=t.data(t.getId()+"-#valueListAnnotation");var n=t.getModel();var i=t.getBinding("value");var o=n.resolve(i.getPath(),i.getContext());if(!a){return}var r=e.getParameter("selectedRow");l.each(r.getCells(),function(e,t){var r=t.getBinding("text");l.each(a.outParameters,function(e,t){if(!t.displayOnly&&t.value==r.getPath()){var a=r.getValue();var s=n.resolve(e,i.getContext());if(a&&s!==o){n.setProperty(s,a)}}})});return true};var t=function(t,a){var n=t.getModel();var i=n.oMetadata;var o=n.resolve(t.getBindingPath("value"),t.getBindingContext());var r={};r.searchSupported=false;r.collectionPath="";r.outParameters={};r.inParameters={};r.selection=[];var s=n.getProperty(o+"/#com.sap.vocabularies.Common.v1.ValueList");if(!s){return false}var p=o.substr(o.lastIndexOf("/")+1);r.inProperty=p;l.each(s.record,function(e,t){l.each(t,function(e,t){if(t.property==="SearchSupported"&&t.bool){r.searchSupported=true}if(t.property==="CollectionPath"){r.collectionPath=t.string}if(t.property==="Parameters"){l.each(t.collection.record,function(e,t){if(t.type==="com.sap.vocabularies.Common.v1.ValueListParameterIn"){var a;l.each(t.propertyValue,function(e,t){if(t.property==="LocalDataProperty"){a=t.propertyPath}});l.each(t.propertyValue,function(e,t){if(t.property==="ValueListProperty"){r.inParameters[a]={value:t.string}}})}else if(t.type==="com.sap.vocabularies.Common.v1.ValueListParameterInOut"){var a;l.each(t.propertyValue,function(e,t){if(t.property==="LocalDataProperty"){a=t.propertyPath}});l.each(t.propertyValue,function(e,t){if(t.property==="ValueListProperty"){r.outParameters[a]={value:t.string};r.inParameters[a]={value:t.string}}})}else if(t.type==="com.sap.vocabularies.Common.v1.ValueListParameterOut"){var a;l.each(t.propertyValue,function(e,t){if(t.property==="LocalDataProperty"){a=t.propertyPath}});l.each(t.propertyValue,function(e,t){if(t.property==="ValueListProperty"){r.outParameters[a]={value:t.string}}})}else if(t.type==="com.sap.vocabularies.Common.v1.ValueListParameterDisplayOnly"){var a;l.each(t.propertyValue,function(e,t){if(t.property==="ValueListProperty"){r.outParameters[t.string]={value:t.string,displayOnly:true}}})}})}})});r.resultEntity=i._getEntityTypeByPath("/"+r.collectionPath);r.listItem=new sap.m.ColumnListItem;l.each(r.outParameters,function(e,a){r.listItem.addCell(new sap.m.Text({text:"{"+a.value+"}",wrapping:false}));t.addSuggestionColumn(new sap.m.Column({header:new sap.m.Text({text:"{/#"+r.resultEntity.name+"/"+a.value+"/@sap:label}",wrapping:false})}));r.selection.push(a.value)});t.data(t.getId()+"-#valueListAnnotation",r);if(a){t.attachSuggestionItemSelected(e)}};var a={suggest:function(e,a,n,i){var o,r=e.getSource();a=a===undefined?true:a;n=n===undefined?true:n;if(!r.data(r.getId()+"-#valueListAnnotation")){t(r,n)}o=r.data(r.getId()+"-#valueListAnnotation");if(!o){return}var s=function(e){var t=this.getLength();if(t&&t<=i){r.setShowTableSuggestionValueHelp(false)}else{r.setShowTableSuggestionValueHelp(true)}};if(o.searchSupported){var m=[];var u,c={};if(a){l.each(o.inParameters,function(e,t){if(e==o.inProperty){u=t.value}else if(a){var n=r.getModel().getProperty(e,r.getBinding("value").getContext());if(n){m.push(new sap.ui.model.Filter(t.value,sap.ui.model.FilterOperator.StartsWith,n))}}})}c.search=e.getParameter("suggestValue");if(o.inParameters.length){if(u){c["search-focus"]=u}else{p(false,"no search-focus defined")}}r.bindAggregation("suggestionRows",{path:"/"+o.collectionPath,length:i,filters:m,parameters:{select:o.selection.join(","),custom:c},events:{dataReceived:s},template:o.listItem})}else{var m=[];l.each(o.inParameters,function(t,n){if(t==o.inProperty){m.push(new sap.ui.model.Filter(n.value,sap.ui.model.FilterOperator.StartsWith,e.getParameter("suggestValue")))}else if(a){var i=r.getModel().getProperty(t,r.getBinding("value").getContext());if(i){m.push(new sap.ui.model.Filter(n.value,sap.ui.model.FilterOperator.StartsWith,i))}}});r.bindAggregation("suggestionRows",{path:"/"+o.collectionPath,filters:m,template:o.listItem,length:i,parameters:{select:o.selection.join(",")},events:{dataReceived:s}})}}};return a}();i.set("sap.ui.layout.form.FormHelper",{createLabel:function(e,t){return new sap.m.Label(t,{text:e})},createButton:function(e,t,a){var n=new sap.m.Button(e,{type:b.ButtonType.Transparent});n.attachEvent("press",t,this);a.call(this,n)},setButtonContent:function(e,t,a,n,i){e.setText(t);e.setTooltip(a);e.setIcon(n);e.setActiveIcon(i)},addFormClass:function(){return"sapUiFormM"},setToolbar:function(e){var t=this.getToolbar();if(t&&t.setDesign){t.setDesign(t.getDesign(),true)}if(e&&e.setDesign){e.setDesign(sap.m.ToolbarDesign.Transparent,true)}return e},getToolbarTitle:function(e){if(e){var t=e.getContent();for(var a=0;a<t.length;a++){var n=t[a];if(n.isA("sap.m.Title")){return n.getId()}}return e.getId()}},createDelimiter:function(e,t){return new sap.m.Text(t,{text:e,textAlign:r.TextAlign.Center})},createSemanticDisplayControl:function(e,t){return new sap.m.Text(t,{text:e})},updateDelimiter:function(e,t){e.setText(t)},updateSemanticDisplayControl:function(e,t){e.setText(t)},bArrowKeySupport:false,bFinal:true});i.set("sap.ui.unified.FileUploaderHelper",{createTextField:function(e){var t=new sap.m.Input(e);return t},setTextFieldContent:function(e,t){e.setWidth(t)},createButton:function(e){var t=new sap.m.Button(e);return t},addFormClass:function(){return"sapUiFUM"},bFinal:true});i.set("sap.ui.unified.ColorPickerHelper",{isResponsive:function(){return true},factory:{createLabel:function(e){return new sap.m.Label(e)},createInput:function(e,t){return new sap.m.InputBase(e,t)},createSlider:function(e,t){return new sap.m.Slider(e,t)},createRadioButtonGroup:function(e){return new sap.m.RadioButtonGroup(e)},createRadioButtonItem:function(e){return new sap.m.RadioButton(e)},createButton:function(e,t){return new sap.m.Button(e,t)}},bFinal:true});i.set("sap.ui.table.TableHelper",{createLabel:function(e){return new sap.m.Label(e)},createTextView:function(e){return new sap.m.Label(e)},addTableClass:function(){return"sapUiTableM"},bFinal:true});i.set("sap.ui.layout.GridHelper",{getLibrarySpecificClass:function(){return""},bFinal:true});if(e.os.android){l(window).on("resize",function(){var e=document.activeElement;var t=e?e.tagName:"";if(t=="INPUT"||t=="TEXTAREA"){setTimeout(function(){e.scrollIntoViewIfNeeded()},0)}})}if(!Number.MAX_SAFE_INTEGER){Number.MAX_SAFE_INTEGER=Math.pow(2,53)-1}return b});
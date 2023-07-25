/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/buildingBlocks/BuildingBlockTemplateProcessor", "sap/fe/core/helpers/StableIdHelper", "sap/ui/mdc/enum/EditMode", "./DisplayStyle", "./EditStyle"], function (BuildingBlockTemplateProcessor, StableIdHelper, EditMode, DisplayStyle, EditStyle) {
  "use strict";

  var generate = StableIdHelper.generate;
  var xml = BuildingBlockTemplateProcessor.xml;
  function getTemplateWithFieldApi(internalField, template) {
    let id;
    if (internalField.formatOptions.fieldMode === "nowrapper" && internalField.editMode === EditMode.Display) {
      return template;
    }
    if (internalField._apiId) {
      id = internalField._apiId;
    } else if (internalField.idPrefix) {
      id = generate([internalField.idPrefix, "Field"]);
    } else {
      id = undefined;
    }
    let changeHandler = "";
    if (internalField.onChange !== null && internalField.onChange !== "null" && internalField.onChange !== undefined) {
      changeHandler = xml`change="${internalField.onChange}"`;
    }
    return xml`
			<macroField:FieldAPI
				xmlns:macroField="sap.fe.macros.field"
				${changeHandler}
				id="${id}"
				required="${internalField.requiredExpression}"
				editable="${internalField.editableExpression}"
				collaborationEnabled="${internalField.collaborationEnabled}"
				visible="${internalField.visible}"
			>
				${template}
			</macroField:FieldAPI>
		`;
  }

  /**
   * Helps to calculate the content edit functionality / templating.
   *
   * @param internalField Reference to the current internal field instance
   * @returns An XML-based string with the definition of the field control
   */
  function getContentEdit(internalField) {
    let contentEdit;
    if (internalField.editMode !== EditMode.Display && !!internalField.editStyle) {
      const editStyleTemplate = EditStyle.getTemplate(internalField);
      let contentInnerEdit;
      if (internalField.collaborationEnabled ?? false) {
        contentInnerEdit = xml`<HBox xmlns="sap.m" width="100%">
            ${editStyleTemplate}
            <core:Fragment fragmentName="sap.fe.macros.internal.CollaborationAvatar" type="XML" />
        </HBox>`;
      } else {
        contentInnerEdit = editStyleTemplate;
      }
      contentEdit = xml`${contentInnerEdit}`;
    }
    return contentEdit || "";
  }

  /**
   * Create the fieldWrapper control for use cases with display and edit styles.
   *
   * @param internalField Reference to the current internal field instance
   * @returns An XML-based string with the definition of the field control
   */
  function createFieldWrapper(internalField) {
    let fieldWrapperID;
    if (internalField._flexId) {
      fieldWrapperID = internalField._flexId;
    } else if (internalField.idPrefix) {
      fieldWrapperID = generate([internalField.idPrefix, "Field-content"]);
    } else {
      fieldWrapperID = undefined;
    }

    // compute the display part and the edit part for the fieldwrapper control
    const contentDisplay = DisplayStyle.getTemplate(internalField);
    // content edit part needs to be wrapped further with an hbox in case of collaboration mode
    // that´s why we need to call this special helper here which finally calls the editStyle.getTemplate
    const contentEdit = getContentEdit(internalField);
    return xml`<controls:FieldWrapper
		xmlns:controls="sap.fe.macros.controls"
		id="${fieldWrapperID}"
		editMode="${internalField.editMode}"
		visible="${internalField.visible}"
		width="100%"
		textAlign="${internalField.textAlign}"
		class="${internalField.class}"
		>

		<controls:contentDisplay>
			${contentDisplay}
		</controls:contentDisplay>
		<controls:contentEdit>
			${contentEdit}
		</controls:contentEdit>

	</controls:FieldWrapper>`;
  }

  /**
   * Helps to calculate the field structure wrapper.
   *
   * @param internalField Reference to the current internal field instance
   * @returns An XML-based string with the definition of the field control
   */
  function getFieldStructureTemplate(internalField) {
    //compute the field in case of mentioned display styles
    if (internalField.displayStyle === "Avatar" || internalField.displayStyle === "Contact" || internalField.displayStyle === "Button" || internalField.displayStyle === "File") {
      // check for special handling in case a file type is used with the collaboration mode
      // (renders an avatar directly)
      if (internalField.displayStyle === "File" && (internalField.collaborationEnabled ?? false) && internalField.editMode !== EditMode.Display) {
        const box = xml`
				<HBox xmlns="sap.m" width="100%">
				<VBox width="100%">
					${DisplayStyle.getFile(internalField)}
				</VBox>
				<core:Fragment fragmentName="sap.fe.macros.internal.CollaborationAvatar" type="XML" />
			</HBox>`;
        return getTemplateWithFieldApi(internalField, box);
      } else {
        //for all other cases render the displayStyles with a field api wrapper
        return getTemplateWithFieldApi(internalField, DisplayStyle.getTemplate(internalField));
      }
    } else if (internalField.formatOptions.fieldMode === "nowrapper" && internalField.editMode === EditMode.Display) {
      //renders a display based building block (e.g. a button) that has no field api wrapper around it.
      return DisplayStyle.getTemplate(internalField);
    } else {
      //for all other cases create a field wrapper
      const fieldWrapper = createFieldWrapper(internalField);
      return getTemplateWithFieldApi(internalField, fieldWrapper);
    }
  }
  return getFieldStructureTemplate;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJnZXRUZW1wbGF0ZVdpdGhGaWVsZEFwaSIsImludGVybmFsRmllbGQiLCJ0ZW1wbGF0ZSIsImlkIiwiZm9ybWF0T3B0aW9ucyIsImZpZWxkTW9kZSIsImVkaXRNb2RlIiwiRWRpdE1vZGUiLCJEaXNwbGF5IiwiX2FwaUlkIiwiaWRQcmVmaXgiLCJnZW5lcmF0ZSIsInVuZGVmaW5lZCIsImNoYW5nZUhhbmRsZXIiLCJvbkNoYW5nZSIsInhtbCIsInJlcXVpcmVkRXhwcmVzc2lvbiIsImVkaXRhYmxlRXhwcmVzc2lvbiIsImNvbGxhYm9yYXRpb25FbmFibGVkIiwidmlzaWJsZSIsImdldENvbnRlbnRFZGl0IiwiY29udGVudEVkaXQiLCJlZGl0U3R5bGUiLCJlZGl0U3R5bGVUZW1wbGF0ZSIsIkVkaXRTdHlsZSIsImdldFRlbXBsYXRlIiwiY29udGVudElubmVyRWRpdCIsImNyZWF0ZUZpZWxkV3JhcHBlciIsImZpZWxkV3JhcHBlcklEIiwiX2ZsZXhJZCIsImNvbnRlbnREaXNwbGF5IiwiRGlzcGxheVN0eWxlIiwidGV4dEFsaWduIiwiY2xhc3MiLCJnZXRGaWVsZFN0cnVjdHVyZVRlbXBsYXRlIiwiZGlzcGxheVN0eWxlIiwiYm94IiwiZ2V0RmlsZSIsImZpZWxkV3JhcHBlciJdLCJzb3VyY2VSb290IjoiLiIsInNvdXJjZXMiOlsiRmllbGRTdHJ1Y3R1cmUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgeG1sIH0gZnJvbSBcInNhcC9mZS9jb3JlL2J1aWxkaW5nQmxvY2tzL0J1aWxkaW5nQmxvY2tUZW1wbGF0ZVByb2Nlc3NvclwiO1xuaW1wb3J0IHsgZ2VuZXJhdGUgfSBmcm9tIFwic2FwL2ZlL2NvcmUvaGVscGVycy9TdGFibGVJZEhlbHBlclwiO1xuaW1wb3J0IEVkaXRNb2RlIGZyb20gXCJzYXAvdWkvbWRjL2VudW0vRWRpdE1vZGVcIjtcbmltcG9ydCBJbnRlcm5hbEZpZWxkQmxvY2sgZnJvbSBcIi4uL0ludGVybmFsRmllbGQuYmxvY2tcIjtcbmltcG9ydCBEaXNwbGF5U3R5bGUgZnJvbSBcIi4vRGlzcGxheVN0eWxlXCI7XG5pbXBvcnQgRWRpdFN0eWxlIGZyb20gXCIuL0VkaXRTdHlsZVwiO1xuXG5mdW5jdGlvbiBnZXRUZW1wbGF0ZVdpdGhGaWVsZEFwaShpbnRlcm5hbEZpZWxkOiBJbnRlcm5hbEZpZWxkQmxvY2ssIHRlbXBsYXRlOiBzdHJpbmcpIHtcblx0bGV0IGlkO1xuXG5cdGlmIChpbnRlcm5hbEZpZWxkLmZvcm1hdE9wdGlvbnMuZmllbGRNb2RlID09PSBcIm5vd3JhcHBlclwiICYmIGludGVybmFsRmllbGQuZWRpdE1vZGUgPT09IEVkaXRNb2RlLkRpc3BsYXkpIHtcblx0XHRyZXR1cm4gdGVtcGxhdGU7XG5cdH1cblxuXHRpZiAoaW50ZXJuYWxGaWVsZC5fYXBpSWQpIHtcblx0XHRpZCA9IGludGVybmFsRmllbGQuX2FwaUlkO1xuXHR9IGVsc2UgaWYgKGludGVybmFsRmllbGQuaWRQcmVmaXgpIHtcblx0XHRpZCA9IGdlbmVyYXRlKFtpbnRlcm5hbEZpZWxkLmlkUHJlZml4LCBcIkZpZWxkXCJdKTtcblx0fSBlbHNlIHtcblx0XHRpZCA9IHVuZGVmaW5lZDtcblx0fVxuXG5cdGxldCBjaGFuZ2VIYW5kbGVyID0gXCJcIjtcblx0aWYgKGludGVybmFsRmllbGQub25DaGFuZ2UgIT09IG51bGwgJiYgaW50ZXJuYWxGaWVsZC5vbkNoYW5nZSAhPT0gXCJudWxsXCIgJiYgaW50ZXJuYWxGaWVsZC5vbkNoYW5nZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0Y2hhbmdlSGFuZGxlciA9IHhtbGBjaGFuZ2U9XCIke2ludGVybmFsRmllbGQub25DaGFuZ2V9XCJgO1xuXHR9XG5cdHJldHVybiB4bWxgXG5cdFx0XHQ8bWFjcm9GaWVsZDpGaWVsZEFQSVxuXHRcdFx0XHR4bWxuczptYWNyb0ZpZWxkPVwic2FwLmZlLm1hY3Jvcy5maWVsZFwiXG5cdFx0XHRcdCR7Y2hhbmdlSGFuZGxlcn1cblx0XHRcdFx0aWQ9XCIke2lkfVwiXG5cdFx0XHRcdHJlcXVpcmVkPVwiJHtpbnRlcm5hbEZpZWxkLnJlcXVpcmVkRXhwcmVzc2lvbn1cIlxuXHRcdFx0XHRlZGl0YWJsZT1cIiR7aW50ZXJuYWxGaWVsZC5lZGl0YWJsZUV4cHJlc3Npb259XCJcblx0XHRcdFx0Y29sbGFib3JhdGlvbkVuYWJsZWQ9XCIke2ludGVybmFsRmllbGQuY29sbGFib3JhdGlvbkVuYWJsZWR9XCJcblx0XHRcdFx0dmlzaWJsZT1cIiR7aW50ZXJuYWxGaWVsZC52aXNpYmxlfVwiXG5cdFx0XHQ+XG5cdFx0XHRcdCR7dGVtcGxhdGV9XG5cdFx0XHQ8L21hY3JvRmllbGQ6RmllbGRBUEk+XG5cdFx0YDtcbn1cblxuLyoqXG4gKiBIZWxwcyB0byBjYWxjdWxhdGUgdGhlIGNvbnRlbnQgZWRpdCBmdW5jdGlvbmFsaXR5IC8gdGVtcGxhdGluZy5cbiAqXG4gKiBAcGFyYW0gaW50ZXJuYWxGaWVsZCBSZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnQgaW50ZXJuYWwgZmllbGQgaW5zdGFuY2VcbiAqIEByZXR1cm5zIEFuIFhNTC1iYXNlZCBzdHJpbmcgd2l0aCB0aGUgZGVmaW5pdGlvbiBvZiB0aGUgZmllbGQgY29udHJvbFxuICovXG5mdW5jdGlvbiBnZXRDb250ZW50RWRpdChpbnRlcm5hbEZpZWxkOiBJbnRlcm5hbEZpZWxkQmxvY2spIHtcblx0bGV0IGNvbnRlbnRFZGl0O1xuXG5cdGlmIChpbnRlcm5hbEZpZWxkLmVkaXRNb2RlICE9PSBFZGl0TW9kZS5EaXNwbGF5ICYmICEhaW50ZXJuYWxGaWVsZC5lZGl0U3R5bGUpIHtcblx0XHRjb25zdCBlZGl0U3R5bGVUZW1wbGF0ZSA9IEVkaXRTdHlsZS5nZXRUZW1wbGF0ZShpbnRlcm5hbEZpZWxkKTtcblx0XHRsZXQgY29udGVudElubmVyRWRpdDtcblx0XHRpZiAoaW50ZXJuYWxGaWVsZC5jb2xsYWJvcmF0aW9uRW5hYmxlZCA/PyBmYWxzZSkge1xuXHRcdFx0Y29udGVudElubmVyRWRpdCA9IHhtbGA8SEJveCB4bWxucz1cInNhcC5tXCIgd2lkdGg9XCIxMDAlXCI+XG4gICAgICAgICAgICAke2VkaXRTdHlsZVRlbXBsYXRlfVxuICAgICAgICAgICAgPGNvcmU6RnJhZ21lbnQgZnJhZ21lbnROYW1lPVwic2FwLmZlLm1hY3Jvcy5pbnRlcm5hbC5Db2xsYWJvcmF0aW9uQXZhdGFyXCIgdHlwZT1cIlhNTFwiIC8+XG4gICAgICAgIDwvSEJveD5gO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb250ZW50SW5uZXJFZGl0ID0gZWRpdFN0eWxlVGVtcGxhdGU7XG5cdFx0fVxuXG5cdFx0Y29udGVudEVkaXQgPSB4bWxgJHtjb250ZW50SW5uZXJFZGl0fWA7XG5cdH1cblx0cmV0dXJuIGNvbnRlbnRFZGl0IHx8IFwiXCI7XG59XG5cbi8qKlxuICogQ3JlYXRlIHRoZSBmaWVsZFdyYXBwZXIgY29udHJvbCBmb3IgdXNlIGNhc2VzIHdpdGggZGlzcGxheSBhbmQgZWRpdCBzdHlsZXMuXG4gKlxuICogQHBhcmFtIGludGVybmFsRmllbGQgUmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IGludGVybmFsIGZpZWxkIGluc3RhbmNlXG4gKiBAcmV0dXJucyBBbiBYTUwtYmFzZWQgc3RyaW5nIHdpdGggdGhlIGRlZmluaXRpb24gb2YgdGhlIGZpZWxkIGNvbnRyb2xcbiAqL1xuZnVuY3Rpb24gY3JlYXRlRmllbGRXcmFwcGVyKGludGVybmFsRmllbGQ6IEludGVybmFsRmllbGRCbG9jaykge1xuXHRsZXQgZmllbGRXcmFwcGVySUQ7XG5cdGlmIChpbnRlcm5hbEZpZWxkLl9mbGV4SWQpIHtcblx0XHRmaWVsZFdyYXBwZXJJRCA9IGludGVybmFsRmllbGQuX2ZsZXhJZDtcblx0fSBlbHNlIGlmIChpbnRlcm5hbEZpZWxkLmlkUHJlZml4KSB7XG5cdFx0ZmllbGRXcmFwcGVySUQgPSBnZW5lcmF0ZShbaW50ZXJuYWxGaWVsZC5pZFByZWZpeCwgXCJGaWVsZC1jb250ZW50XCJdKTtcblx0fSBlbHNlIHtcblx0XHRmaWVsZFdyYXBwZXJJRCA9IHVuZGVmaW5lZDtcblx0fVxuXG5cdC8vIGNvbXB1dGUgdGhlIGRpc3BsYXkgcGFydCBhbmQgdGhlIGVkaXQgcGFydCBmb3IgdGhlIGZpZWxkd3JhcHBlciBjb250cm9sXG5cdGNvbnN0IGNvbnRlbnREaXNwbGF5ID0gRGlzcGxheVN0eWxlLmdldFRlbXBsYXRlKGludGVybmFsRmllbGQpO1xuXHQvLyBjb250ZW50IGVkaXQgcGFydCBuZWVkcyB0byBiZSB3cmFwcGVkIGZ1cnRoZXIgd2l0aCBhbiBoYm94IGluIGNhc2Ugb2YgY29sbGFib3JhdGlvbiBtb2RlXG5cdC8vIHRoYXTCtHMgd2h5IHdlIG5lZWQgdG8gY2FsbCB0aGlzIHNwZWNpYWwgaGVscGVyIGhlcmUgd2hpY2ggZmluYWxseSBjYWxscyB0aGUgZWRpdFN0eWxlLmdldFRlbXBsYXRlXG5cdGNvbnN0IGNvbnRlbnRFZGl0ID0gZ2V0Q29udGVudEVkaXQoaW50ZXJuYWxGaWVsZCk7XG5cdHJldHVybiB4bWxgPGNvbnRyb2xzOkZpZWxkV3JhcHBlclxuXHRcdHhtbG5zOmNvbnRyb2xzPVwic2FwLmZlLm1hY3Jvcy5jb250cm9sc1wiXG5cdFx0aWQ9XCIke2ZpZWxkV3JhcHBlcklEfVwiXG5cdFx0ZWRpdE1vZGU9XCIke2ludGVybmFsRmllbGQuZWRpdE1vZGV9XCJcblx0XHR2aXNpYmxlPVwiJHtpbnRlcm5hbEZpZWxkLnZpc2libGV9XCJcblx0XHR3aWR0aD1cIjEwMCVcIlxuXHRcdHRleHRBbGlnbj1cIiR7aW50ZXJuYWxGaWVsZC50ZXh0QWxpZ259XCJcblx0XHRjbGFzcz1cIiR7aW50ZXJuYWxGaWVsZC5jbGFzc31cIlxuXHRcdD5cblxuXHRcdDxjb250cm9sczpjb250ZW50RGlzcGxheT5cblx0XHRcdCR7Y29udGVudERpc3BsYXl9XG5cdFx0PC9jb250cm9sczpjb250ZW50RGlzcGxheT5cblx0XHQ8Y29udHJvbHM6Y29udGVudEVkaXQ+XG5cdFx0XHQke2NvbnRlbnRFZGl0fVxuXHRcdDwvY29udHJvbHM6Y29udGVudEVkaXQ+XG5cblx0PC9jb250cm9sczpGaWVsZFdyYXBwZXI+YDtcbn1cblxuLyoqXG4gKiBIZWxwcyB0byBjYWxjdWxhdGUgdGhlIGZpZWxkIHN0cnVjdHVyZSB3cmFwcGVyLlxuICpcbiAqIEBwYXJhbSBpbnRlcm5hbEZpZWxkIFJlZmVyZW5jZSB0byB0aGUgY3VycmVudCBpbnRlcm5hbCBmaWVsZCBpbnN0YW5jZVxuICogQHJldHVybnMgQW4gWE1MLWJhc2VkIHN0cmluZyB3aXRoIHRoZSBkZWZpbml0aW9uIG9mIHRoZSBmaWVsZCBjb250cm9sXG4gKi9cbmZ1bmN0aW9uIGdldEZpZWxkU3RydWN0dXJlVGVtcGxhdGUoaW50ZXJuYWxGaWVsZDogSW50ZXJuYWxGaWVsZEJsb2NrKSB7XG5cdC8vY29tcHV0ZSB0aGUgZmllbGQgaW4gY2FzZSBvZiBtZW50aW9uZWQgZGlzcGxheSBzdHlsZXNcblx0aWYgKFxuXHRcdGludGVybmFsRmllbGQuZGlzcGxheVN0eWxlID09PSBcIkF2YXRhclwiIHx8XG5cdFx0aW50ZXJuYWxGaWVsZC5kaXNwbGF5U3R5bGUgPT09IFwiQ29udGFjdFwiIHx8XG5cdFx0aW50ZXJuYWxGaWVsZC5kaXNwbGF5U3R5bGUgPT09IFwiQnV0dG9uXCIgfHxcblx0XHRpbnRlcm5hbEZpZWxkLmRpc3BsYXlTdHlsZSA9PT0gXCJGaWxlXCJcblx0KSB7XG5cdFx0Ly8gY2hlY2sgZm9yIHNwZWNpYWwgaGFuZGxpbmcgaW4gY2FzZSBhIGZpbGUgdHlwZSBpcyB1c2VkIHdpdGggdGhlIGNvbGxhYm9yYXRpb24gbW9kZVxuXHRcdC8vIChyZW5kZXJzIGFuIGF2YXRhciBkaXJlY3RseSlcblx0XHRpZiAoXG5cdFx0XHRpbnRlcm5hbEZpZWxkLmRpc3BsYXlTdHlsZSA9PT0gXCJGaWxlXCIgJiZcblx0XHRcdChpbnRlcm5hbEZpZWxkLmNvbGxhYm9yYXRpb25FbmFibGVkID8/IGZhbHNlKSAmJlxuXHRcdFx0aW50ZXJuYWxGaWVsZC5lZGl0TW9kZSAhPT0gRWRpdE1vZGUuRGlzcGxheVxuXHRcdCkge1xuXHRcdFx0Y29uc3QgYm94ID0geG1sYFxuXHRcdFx0XHQ8SEJveCB4bWxucz1cInNhcC5tXCIgd2lkdGg9XCIxMDAlXCI+XG5cdFx0XHRcdDxWQm94IHdpZHRoPVwiMTAwJVwiPlxuXHRcdFx0XHRcdCR7RGlzcGxheVN0eWxlLmdldEZpbGUoaW50ZXJuYWxGaWVsZCl9XG5cdFx0XHRcdDwvVkJveD5cblx0XHRcdFx0PGNvcmU6RnJhZ21lbnQgZnJhZ21lbnROYW1lPVwic2FwLmZlLm1hY3Jvcy5pbnRlcm5hbC5Db2xsYWJvcmF0aW9uQXZhdGFyXCIgdHlwZT1cIlhNTFwiIC8+XG5cdFx0XHQ8L0hCb3g+YDtcblx0XHRcdHJldHVybiBnZXRUZW1wbGF0ZVdpdGhGaWVsZEFwaShpbnRlcm5hbEZpZWxkLCBib3gpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvL2ZvciBhbGwgb3RoZXIgY2FzZXMgcmVuZGVyIHRoZSBkaXNwbGF5U3R5bGVzIHdpdGggYSBmaWVsZCBhcGkgd3JhcHBlclxuXHRcdFx0cmV0dXJuIGdldFRlbXBsYXRlV2l0aEZpZWxkQXBpKGludGVybmFsRmllbGQsIERpc3BsYXlTdHlsZS5nZXRUZW1wbGF0ZShpbnRlcm5hbEZpZWxkKSk7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKGludGVybmFsRmllbGQuZm9ybWF0T3B0aW9ucy5maWVsZE1vZGUgPT09IFwibm93cmFwcGVyXCIgJiYgaW50ZXJuYWxGaWVsZC5lZGl0TW9kZSA9PT0gRWRpdE1vZGUuRGlzcGxheSkge1xuXHRcdC8vcmVuZGVycyBhIGRpc3BsYXkgYmFzZWQgYnVpbGRpbmcgYmxvY2sgKGUuZy4gYSBidXR0b24pIHRoYXQgaGFzIG5vIGZpZWxkIGFwaSB3cmFwcGVyIGFyb3VuZCBpdC5cblx0XHRyZXR1cm4gRGlzcGxheVN0eWxlLmdldFRlbXBsYXRlKGludGVybmFsRmllbGQpO1xuXHR9IGVsc2Uge1xuXHRcdC8vZm9yIGFsbCBvdGhlciBjYXNlcyBjcmVhdGUgYSBmaWVsZCB3cmFwcGVyXG5cdFx0Y29uc3QgZmllbGRXcmFwcGVyID0gY3JlYXRlRmllbGRXcmFwcGVyKGludGVybmFsRmllbGQpO1xuXHRcdHJldHVybiBnZXRUZW1wbGF0ZVdpdGhGaWVsZEFwaShpbnRlcm5hbEZpZWxkLCBmaWVsZFdyYXBwZXIpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldEZpZWxkU3RydWN0dXJlVGVtcGxhdGU7XG4iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUFBO0FBQUE7Ozs7OztFQU9BLFNBQVNBLHVCQUF1QixDQUFDQyxhQUFpQyxFQUFFQyxRQUFnQixFQUFFO0lBQ3JGLElBQUlDLEVBQUU7SUFFTixJQUFJRixhQUFhLENBQUNHLGFBQWEsQ0FBQ0MsU0FBUyxLQUFLLFdBQVcsSUFBSUosYUFBYSxDQUFDSyxRQUFRLEtBQUtDLFFBQVEsQ0FBQ0MsT0FBTyxFQUFFO01BQ3pHLE9BQU9OLFFBQVE7SUFDaEI7SUFFQSxJQUFJRCxhQUFhLENBQUNRLE1BQU0sRUFBRTtNQUN6Qk4sRUFBRSxHQUFHRixhQUFhLENBQUNRLE1BQU07SUFDMUIsQ0FBQyxNQUFNLElBQUlSLGFBQWEsQ0FBQ1MsUUFBUSxFQUFFO01BQ2xDUCxFQUFFLEdBQUdRLFFBQVEsQ0FBQyxDQUFDVixhQUFhLENBQUNTLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNqRCxDQUFDLE1BQU07TUFDTlAsRUFBRSxHQUFHUyxTQUFTO0lBQ2Y7SUFFQSxJQUFJQyxhQUFhLEdBQUcsRUFBRTtJQUN0QixJQUFJWixhQUFhLENBQUNhLFFBQVEsS0FBSyxJQUFJLElBQUliLGFBQWEsQ0FBQ2EsUUFBUSxLQUFLLE1BQU0sSUFBSWIsYUFBYSxDQUFDYSxRQUFRLEtBQUtGLFNBQVMsRUFBRTtNQUNqSEMsYUFBYSxHQUFHRSxHQUFJLFdBQVVkLGFBQWEsQ0FBQ2EsUUFBUyxHQUFFO0lBQ3hEO0lBQ0EsT0FBT0MsR0FBSTtBQUNaO0FBQ0E7QUFDQSxNQUFNRixhQUFjO0FBQ3BCLFVBQVVWLEVBQUc7QUFDYixnQkFBZ0JGLGFBQWEsQ0FBQ2Usa0JBQW1CO0FBQ2pELGdCQUFnQmYsYUFBYSxDQUFDZ0Isa0JBQW1CO0FB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
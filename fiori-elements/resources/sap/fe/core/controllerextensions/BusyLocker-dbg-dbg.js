/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2023 SAP SE. All rights reserved
 */
sap.ui.define(["sap/base/Log"], function (Log) {
  "use strict";

  const _iTimeoutInSeconds = 30,
    _mLockCounters = {},
    _oReferenceDummy = {
      getId: function () {
        return "BusyLocker.ReferenceDummy";
      },
      setBusy: function (bBusy) {
        Log.info(`setBusy(${bBusy}) triggered on dummy reference`);
      }
    };
  function getLockCountId(oReference, sPath) {
    return oReference.getId() + (sPath || "/busy");
  }
  function isLocked(oReference, sPath) {
    return getLockCountId(oReference, sPath) in _mLockCounters;
  }
  function getLockCountEntry(oReference, sPath) {
    if (!oReference || !oReference.getId) {
      Log.warning("No reference for BusyLocker, using dummy reference");
      oReference = _oReferenceDummy;
    }
    sPath = sPath || "/busy";
    const sId = getLockCountId(oReference, sPath);
    if (!(sId in _mLockCounters)) {
      _mLockCounters[sId] = {
        id: sId,
        path: sPath,
        reference: oReference,
        count: 0
      };
    }
    return _mLockCounters[sId];
  }
  /**
   * @param mLockCountEntry
   */
  function deleteLockCountEntry(mLockCountEntry) {
    delete _mLockCounters[mLockCountEntry.id];
  }
  function applyLockState(mLockCountEntry) {
    const bIsModel = mLockCountEntry.reference.isA && mLockCountEntry.reference.isA("sap.ui.model.Model"),
      bBusy = mLockCountEntry.count !== 0;
    if (bIsModel) {
      mLockCountEntry.reference.setProperty(mLockCountEntry.path, bBusy, undefined, true);
    } else if (mLockCountEntry.reference.setBusy) {
      mLockCountEntry.reference.setBusy(bBusy);
    }
    clearTimeout(mLockCountEntry.timeout);
    if (bBusy) {
      mLockCountEntry.timeout = setTimeout(function () {
        Log.error(`busy lock for ${mLockCountEntry.id} with value ${mLockCountEntry.count} timed out after ${_iTimeoutInSeconds} seconds!`);
      }, _iTimeoutInSeconds * 1000);
    } else {
      deleteLockCountEntry(mLockCountEntry);
    }
    return bBusy;
  }
  function changeLockCount(mLockCountEntry, iDelta) {
    if (iDelta === 0) {
      mLockCountEntry.count = 0;
      Log.info(`busy lock count '${mLockCountEntry.id}' was reset to 0`);
    } else {
      mLockCountEntry.count += iDelta;
      Log.info(`busy lock count '${mLockCountEntry.id}' is ${mLockCountEntry.count}`);
    }
  }
  const BusyLocker = {
    lock: function (oModelOrControl, sPath) {
      return this._updateLock(oModelOrControl, sPath, 1);
    },
    unlock: function (oModelOrControl, sPath) {
      return this._updateLock(oModelOrControl, sPath, -1);
    },
    isLocked: function (oModelOrControl, sPath) {
      return isLocked(oModelOrControl, sPath);
    },
    _updateLock: function (oReference, sPath, iDelta) {
      const mLockCountEntry = getLockCountEntry(oReference, sPath);
      changeLockCount(mLockCountEntry, iDelta);
      return applyLockState(mLockCountEntry);
    }
  };
  return BusyLocker;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfaVRpbWVvdXRJblNlY29uZHMiLCJfbUxvY2tDb3VudGVycyIsIl9vUmVmZXJlbmNlRHVtbXkiLCJnZXRJZCIsInNldEJ1c3kiLCJiQnVzeSIsIkxvZyIsImluZm8iLCJnZXRMb2NrQ291bnRJZCIsIm9SZWZlcmVuY2UiLCJzUGF0aCIsImlzTG9ja2VkIiwiZ2V0TG9ja0NvdW50RW50cnkiLCJ3YXJuaW5nIiwic0lkIiwiaWQiLCJwYXRoIiwicmVmZXJlbmNlIiwiY291bnQiLCJkZWxldGVMb2NrQ291bnRFbnRyeSIsIm1Mb2NrQ291bnRFbnRyeSIsImFwcGx5TG9ja1N0YXRlIiwiYklzTW9kZWwiLCJpc0EiLCJzZXRQcm9wZXJ0eSIsInVuZGVmaW5lZCIsImNsZWFyVGltZW91dCIsInRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiZXJyb3IiLCJjaGFuZ2VMb2NrQ291bnQiLCJpRGVsdGEiLCJCdXN5TG9ja2VyIiwibG9jayIsIm9Nb2RlbE9yQ29udHJvbCIsIl91cGRhdGVMb2NrIiwidW5sb2NrIl0sInNvdXJjZVJvb3QiOiIuIiwic291cmNlcyI6WyJCdXN5TG9ja2VyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMb2cgZnJvbSBcInNhcC9iYXNlL0xvZ1wiO1xuY29uc3QgX2lUaW1lb3V0SW5TZWNvbmRzID0gMzAsXG5cdF9tTG9ja0NvdW50ZXJzOiBhbnkgPSB7fSxcblx0X29SZWZlcmVuY2VEdW1teSA9IHtcblx0XHRnZXRJZDogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIFwiQnVzeUxvY2tlci5SZWZlcmVuY2VEdW1teVwiO1xuXHRcdH0sXG5cdFx0c2V0QnVzeTogZnVuY3Rpb24gKGJCdXN5OiBhbnkpIHtcblx0XHRcdExvZy5pbmZvKGBzZXRCdXN5KCR7YkJ1c3l9KSB0cmlnZ2VyZWQgb24gZHVtbXkgcmVmZXJlbmNlYCk7XG5cdFx0fVxuXHR9O1xuZnVuY3Rpb24gZ2V0TG9ja0NvdW50SWQob1JlZmVyZW5jZTogYW55LCBzUGF0aDogYW55KSB7XG5cdHJldHVybiBvUmVmZXJlbmNlLmdldElkKCkgKyAoc1BhdGggfHwgXCIvYnVzeVwiKTtcbn1cbmZ1bmN0aW9uIGlzTG9ja2VkKG9SZWZlcmVuY2U6IGFueSwgc1BhdGg6IGFueSkge1xuXHRyZXR1cm4gZ2V0TG9ja0NvdW50SWQob1JlZmVyZW5jZSwgc1BhdGgpIGluIF9tTG9ja0NvdW50ZXJzO1xufVxuZnVuY3Rpb24gZ2V0TG9ja0NvdW50RW50cnkob1JlZmVyZW5jZTogYW55LCBzUGF0aDogYW55KSB7XG5cdGlmICghb1JlZmVyZW5jZSB8fCAhb1JlZmVyZW5jZS5nZXRJZCkge1xuXHRcdExvZy53YXJuaW5nKFwiTm8gcmVmZXJlbmNlIGZvciBCdXN5TG9ja2VyLCB1c2luZyBkdW1teSByZWZlcmVuY2VcIik7XG5cdFx0b1JlZmVyZW5jZSA9IF9vUmVmZXJlbmNlRHVtbXk7XG5cdH1cblxuXHRzUGF0aCA9IHNQYXRoIHx8IFwiL2J1c3lcIjtcblx0Y29uc3Qgc0lkID0gZ2V0TG9ja0NvdW50SWQob1JlZmVyZW5jZSwgc1BhdGgpO1xuXG5cdGlmICghKHNJZCBpbiBfbUxvY2tDb3VudGVycykpIHtcblx0XHRfbUxvY2tDb3VudGVyc1tzSWRdID0ge1xuXHRcdFx0aWQ6IHNJZCxcblx0XHRcdHBhdGg6IHNQYXRoLFxuXHRcdFx0cmVmZXJlbmNlOiBvUmVmZXJlbmNlLFxuXHRcdFx0Y291bnQ6IDBcblx0XHR9O1xuXHR9XG5cdHJldHVybiBfbUxvY2tDb3VudGVyc1tzSWRdO1xufVxuLyoqXG4gKiBAcGFyYW0gbUxvY2tDb3VudEVudHJ5XG4gKi9cbmZ1bmN0aW9uIGRlbGV0ZUxvY2tDb3VudEVudHJ5KG1Mb2NrQ291bnRFbnRyeTogYW55KSB7XG5cdGRlbGV0ZSBfbUxvY2tDb3VudGVyc1ttTG9ja0NvdW50RW50cnkuaWRdO1xufVxuXG5mdW5jdGlvbiBhcHBseUxvY2tTdGF0ZShtTG9ja0NvdW50RW50cnk6IGFueSkge1xuXHRjb25zdCBiSXNNb2RlbCA9IG1Mb2NrQ291bnRFbnRyeS5yZWZlcmVuY2UuaXNBICYmIG1Mb2NrQ291bnRFbnRyeS5yZWZlcmVuY2UuaXNBKFwic2FwLnVpLm1vZGVsLk1vZGVsXCIpLFxuXHRcdGJCdXN5ID0gbUxvY2tDb3VudEVudHJ5LmNvdW50ICE9PSAwO1xuXG5cdGlmIChiSXNNb2RlbCkge1xuXHRcdG1Mb2NrQ291bnRFbnRyeS5yZWZlcmVuY2Uuc2V0UHJvcGVydHkobUxvY2tDb3VudEVudHJ5LnBhdGgsIGJCdXN5LCB1bmRlZmluZWQsIHRydWUpO1xuXHR9IGVsc2UgaWYgKG1Mb2NrQ291bnRFbnRyeS5yZWZlcmVuY2Uuc2V0QnVzeSkge1xuXHRcdG1Mb2NrQ291bnRFbnRyeS5yZWZlcmVuY2Uuc2V0QnVzeShiQnVzeSk7XG5cdH1cblxuXHRjbGVhclRpbWVvdXQobUxvY2tDb3VudEVudHJ5LnRpbWVvdXQpO1xuXHRpZiAoYkJ1c3kpIHtcblx0XHRtTG9ja0NvdW50RW50cnkudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0TG9nLmVycm9yKFxuXHRcdFx0XHRgYnVzeSBsb2NrIGZvciAke21Mb2NrQ291bnRFbnRyeS5pZH0gd2l0aCB2YWx1ZSAke21Mb2NrQ291bnRFbnRyeS5jb3VudH0gdGltZWQgb3V0IGFmdGVyICR7X2lUaW1lb3V0SW5TZWNvbmRzfSBzZWNvbmRzIWBcblx0XHRcdCk7XG5cdFx0fSwgX2lUaW1lb3V0SW5TZWNvbmRzICogMTAwMCk7XG5cdH0gZWxzZSB7XG5cdFx0ZGVsZXRlTG9ja0NvdW50RW50cnkobUxvY2tDb3VudEVudHJ5KTtcblx0fVxuXG5cdHJldHVybiBiQnVzeTtcbn1cblxuZnVuY3Rpb24gY2hhbmdlTG9ja0NvdW50KG1Mb2NrQ291bnRFbnRyeTogYW55LCBpRGVsdGE6IGFueSkge1xuXHRpZiAoaURlbHRhID09PSAwKSB7XG5cdFx0bUxvY2tDb3VudEVudHJ5LmNvdW50ID0gMDtcblx0XHRMb2cuaW5mbyhgYnVzeSBsb2NrIGNvdW50ICcke21Mb2NrQ291bnRFbnRyeS5pZH0nIHdhcyByZXNldCB0byAwYCk7XG5cdH0gZWxzZSB7XG5cdFx0bUxvY2tDb3VudEVudHJ5LmNvdW50ICs9IGlEZWx0YTtcblx0XHRMb2cuaW5mbyhgYnVzeSBsb2NrIGNvdW50ICcke21Mb2NrQ291bnRFbnRyeS5pZH0nIGlzICR7bUxvY2tDb3VudEVudHJ5LmNvdW50fWApO1xuXHR9XG59XG5cbmNvbnN0IEJ1c3lMb2NrZXIgPSB7XG5cdGxvY2s6IGZ1bmN0aW9uIChvTW9kZWxPckNvbnRyb2w6IGFueSwgc1BhdGg/OiBzdHJpbmcpIHtcblx0XHRyZXR1cm4gdGhpcy5fdXBkYXRlTG9jayhvTW9kZWxPckNvbnRyb2wsIHNQYXRoLCAxKTtcblx0fSxcblxuXHR1bmxvY2s6IGZ1bmN0aW9uIChvTW9kZWxPckNvbnRyb2w6IGFueSwgc1BhdGg/OiBzdHJpbmcpIHtcblx0XHRyZXR1cm4gdGhpcy5fdXBkYXRlTG9jayhvTW9kZWxPckNvbnRyb2wsIHNQYXRoLCAtMSk7XG5cdH0sXG5cblx0aXNMb2NrZWQ6IGZ1bmN0aW9uIChvTW9kZWxPckNvbnRyb2w6IGFueSwgc1BhdGg/OiBzdHJpbmcpIHtcblx0XHRyZXR1cm4gaXNMb2NrZWQob01vZGVsT3JDb250cm9sLCBzUGF0aCk7XG5cdH0sXG5cblx0X3VwZGF0ZUxvY2s6IGZ1bmN0aW9uIChvUmVmZXJlbmNlOiBhbnksIHNQYXRoOiBhbnksIGlEZWx0YTogYW55KSB7XG5cdFx0Y29uc3QgbUxvY2tDb3VudEVudHJ5ID0gZ2V0TG9ja0NvdW50RW50cnkob1JlZmVyZW5jZSwgc1BhdGgpO1xuXHRcdGNoYW5nZUxvY2tDb3VudChtTG9ja0NvdW50RW50cnksIGlEZWx0YSk7XG5cdFx0cmV0dXJuIGFwcGx5TG9ja1N0YXRlKG1Mb2NrQ291bnRFbnRyeSk7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJ1c3lMb2NrZXI7XG4iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUFBO0FBQUE7Ozs7RUFDQSxNQUFNQSxrQkFBa0IsR0FBRyxFQUFFO0lBQzVCQyxjQUFtQixHQUFH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
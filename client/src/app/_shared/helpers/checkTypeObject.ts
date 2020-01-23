export const checkType = (value: Object): string => {
    var regex = /^\[object (\S+?)\]$/;
    var matches = Object.prototype.toString.call(value).match(regex) || [];
  
    return (matches[1] || 'undefined').toLowerCase();
}
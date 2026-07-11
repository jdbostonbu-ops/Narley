# PROVIDER-APP-SPEC.md

# Narley Provider Application Specification

**Project:** Narley

**Application:** Provider

**Document Version:** 3.0.0

**Status:** Draft

**Last Updated:** YYYY-MM-DD

**Audience:**

- Developers
- AI Coding Assistants
- Project Owner
- Future Contributors

---

# Purpose

The Provider application enables verified organizations to create, manage, verify, and maintain community resources within Narley.

Unlike the Reader application, the Provider application is intended for authorized staff members responsible for maintaining accurate community resource information.

Providers are the final authority for all published resource data.

Artificial Intelligence and community reports assist providers but never replace provider decision-making.

---

# Design Philosophy

The Provider application is designed around five principles.

## Accuracy

Published information should be reliable and current.

---

## Accountability

Providers are responsible for verifying and approving all changes that affect public resource information.

---

## Simplicity

Routine resource management tasks should require as few steps as possible.

---

## Community Intelligence

Providers benefit from information supplied by Readers and AI verification.

---

## Accessibility

Provider workflows should remain accessible and easy to use across supported mobile devices.

---

# Provider Goals

The Provider application allows authorized users to:

- Create community resources.
- Edit existing resources.
- Pause resources.
- Mark resources closed.
- Archive resources.
- Restore archived resources.
- Review community reports.
- Review AI verification alerts.
- Receive notifications.
- Maintain organization information.

---

# Authentication

Provider authentication is separate from Reader authentication.

Only verified Provider accounts may access Provider functionality.

---

## Supported Authentication

Version 3 supports:

- Email and Password
- Google Sign-In

Provider accounts must be verified before access is granted.

---

# Provider Navigation

Version 3 Provider navigation includes:

```text
Map

Post

My Posts

Alerts

Profile
```

This navigation structure should remain consistent throughout Version 3.

---

# Provider Dashboard

## Purpose

The Provider Dashboard gives providers immediate visibility into resource activity requiring attention.

The dashboard is intended to reduce the time required to identify and respond to issues.

---

## Dashboard Overview

The dashboard may include summary cards such as:

- Active Resources
- Resources Requiring Review
- Community Reports
- AI Verification Alerts
- Recently Updated Resources
- Notifications

The exact dashboard layout may evolve based on CPA feedback.

---

# Provider Map

The Provider Map displays all resources managed by the authenticated provider.

Providers may:

- View resources
- Select resources
- Open resource details
- Edit resources
- Create new resources

The Provider Map is intended for resource management rather than public discovery.

---

# Creating Resources

## Purpose

Providers create new community resources that become available to Readers after publication.

---

## Required Information

A new resource should include:

- Resource Name
- Category
- Address
- Location
- Status
- Contact Information
- Description

Additional optional fields may be added in future versions.

---

## Publishing

Publishing a resource makes it visible to Readers.

Resources should pass validation before publication.

---

# Editing Resources

Providers may edit:

- Name
- Description
- Address
- Contact Information
- Category
- Availability Status
- Notes

Edits should update the published resource after successful validation.

---

# Resource Lifecycle

Resources move through the following lifecycle:

```text
Draft

↓

Active

↓

Paused

↓

Closed

↓

Archived

↓

Restored (when appropriate)
```

Permanent deletion should be avoided whenever practical.

---

# Confirmation Dialogs

The following actions require confirmation:

- Archive Resource
- Mark Resource Closed
- Remove Resource
- Restore Resource
- Cancel Editing

Users should always be able to cancel before changes are applied.

---

# My Posts

## Purpose

The My Posts screen allows Providers to manage all resources belonging to their organization.

Providers may:

- Search
- Filter
- Sort
- Edit
- Pause
- Archive
- Restore

Each resource should clearly display its current status.

---

# Business Rule

Only Providers may publish changes to Reader-visible resource information.

Readers and AI systems cannot directly modify published resources.

---

# Community Intelligence Dashboard

## Purpose

The Community Intelligence Dashboard is the primary workspace for Providers to review community feedback, AI-assisted verification results, and resource issues requiring action.

The dashboard helps Providers maintain accurate and trustworthy community resource information while reducing manual effort.

Readers contribute information.

Artificial Intelligence gathers supporting evidence.

Providers make the final decision.

---

## Dashboard Overview

The dashboard should provide an at-a-glance summary of items requiring attention.

Example summary cards include:

- Resources Requiring Review
- Community Reports
- AI Verification Alerts
- Recently Updated Resources
- Active Notifications

The dashboard should prioritize items requiring immediate attention.

---

## Community Reports

Community reports are submitted by Readers through the Reader application.

Reports should never automatically modify published resource information.

Examples include:

- Resource Closed
- Wrong Location
- Wrong Phone Number
- Phone Not in Service
- Hours Changed
- No Longer Offers Service
- Out of Funding

Each report enters the Provider Review Queue.

---

# Provider Review Queue

## Purpose

The Review Queue displays all community reports and AI verification alerts awaiting Provider review.

The queue serves as the Provider's primary task list.

---

## Queue Information

Each review item should display:

- Resource Name
- Resource Category
- Report Type
- Date Submitted
- AI Confidence Score (if available)
- Current Resource Status

Providers should be able to sort and filter the queue.

---

## Provider Actions

For each review item, Providers may:

- View Resource Details
- Review Community Reports
- Review AI Evidence
- Contact the Organization
- Edit Resource Information
- Pause Resource
- Mark Resource Closed
- Archive Resource
- Dismiss Report (if incorrect)

All published changes require Provider confirmation.

---

# AI Verification

## Purpose

Artificial Intelligence assists Providers by gathering publicly available information that may indicate a resource requires review.

AI provides recommendations only.

Providers remain responsible for all published changes.

---

## AI Evidence

AI verification may include:

- Organization website status
- Public closure notices
- Phone availability signals
- Public business information
- Government listings
- News articles
- Other publicly available evidence

AI evidence should be presented as supporting information rather than final conclusions.

---

## Confidence Score

Each AI verification result should include a confidence score.

Example:

```text
Confidence

High

Medium

Low
```

Confidence scores assist prioritization.

They do not determine Provider decisions.

---

## Provider Decision

After reviewing available information, Providers may:

- Leave Resource Unchanged
- Update Resource Information
- Pause Resource
- Mark Resource Closed
- Archive Resource

Provider decisions should be recorded for auditing purposes.

---

# Alerts

## Purpose

The Alerts screen keeps Providers informed of important events affecting their resources.

Alerts should be actionable whenever possible.

---

## Alert Categories

Examples include:

- Community Reports
- AI Verification Results
- Resource Expiration
- Resource Availability Changes
- System Notifications

Future alert categories may be added with CPA approval.

---

## Alert Behavior

Alerts should include:

- Priority
- Timestamp
- Related Resource
- Recommended Action (when applicable)

Resolved alerts should no longer appear in the active list.

---

# Notifications

Providers may receive notifications for:

- New community reports
- AI verification results
- Resource review reminders
- Organization announcements

Notification preferences should be configurable within the Provider Profile.

---

# Provider Profile

## Purpose

The Provider Profile allows Providers to manage organization settings and account preferences.

---

## Profile Information

The profile may include:

- Organization Name
- Contact Email
- Organization Logo
- Verification Status
- Notification Preferences
- Account Information
- Sign Out

Additional organization settings may be introduced in future versions.

---

# Accessibility

The Provider application must support:

- Screen readers
- High contrast
- Accessible labels
- Large touch targets
- Plain language
- Consistent navigation

Accessibility is required for administrative workflows as well as Reader-facing experiences.

---

# Error States

The Provider application should provide clear recovery paths for common issues.

Examples include:

- Authentication Expired
- Network Unavailable
- Resource Not Found
- Validation Failed
- AI Verification Unavailable
- Community Report Submission Error
- Notification Delivery Failure

Error messages should clearly explain the problem and, where appropriate, provide a recommended action.

---

# Business Rules

The following rules apply throughout the Provider application.

- Providers are the final authority for published resource information.
- Readers cannot directly modify resources.
- AI cannot directly modify resources.
- Every destructive action requires confirmation.
- Community reports require Provider review.
- Archived resources remain available for historical reference.
- Published changes should be auditable.

---

# Version 3 Provider Additions

Version 3 introduces:

- Community Intelligence Dashboard
- Provider Review Queue
- AI-assisted verification
- Structured community reporting
- Enhanced notifications
- Resource lifecycle management
- Improved accessibility

Version 3 extends the existing Provider application without redesigning established workflows.

---

# Out of Scope

The following are not included in Version 3 unless approved by CPA:

- Future Ideas
- Post Capstone features
- Experimental AI automation
- Automatic resource publishing
- Automatic resource deletion
- Administrative features unrelated to Provider resource management

---

# Provider Specification Summary

The Provider application enables verified organizations to maintain accurate community resource information through a combination of provider expertise, community participation, and AI-assisted verification.

Providers remain responsible for every published change.

Community Intelligence is designed to improve data quality while preserving accountability, transparency, and trust.